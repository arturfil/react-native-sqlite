import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Crypto } from '../interfaces/Crypto';
import { User } from '../interfaces/User';

type DataBaseContextProps = {
  cryptos: Crypto[];
  users: User[];
  singleCrypto: Crypto;
  getData: () => Promise<void>;
  getSingleCrypto: (id: number) => Promise<void>;
  createTable: () => Promise<void>;
  setData: (name: string, price: string, quantity: number) => Promise<void>;
  updateData: (id: number, name: string, price: string, quantity: number) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
}

export const DatabaseContext = createContext({} as DataBaseContextProps);

export const DatabaseProvider = ({ children }: any) => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [singleCrypto, setSingleCrypto] = useState<Crypto>({
    Id: 0,
    name: '',
    price: '',
    quantity: 0,
  });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    createTable();
    getData();
  }, [])

  useEffect(() => {
    return () => {
      console.log("Clean up");
    }
  }, [])

  const db = SQLite.openDatabase({
    name: 'rnsqlite.db',
    location: 'default',
  },
    () => { },
    error => {
      console.log(error);
    }
  )

  const createTable = async () => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS 
        Cryptos
        (Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price VARCHAR(255), quantity DOUBLE);
      `)
    })
  }

  const dropTable = async () => {
    db.transaction(tx => {
      tx.executeSql(`
        DROP TABLE Cryptos;
      `)
    })
  }

  const getData = async () => {
    let dbCryptos: Crypto[] = [];
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM Cryptos`,
          [], (tx, res) => {
            for (let i = 0; i < res.rows.length; i++) {
              console.log("Inside loop --------->");

              console.log("Item", res.rows.item(i));
              let crypto = res.rows.item(i)
              dbCryptos.push(crypto)
            }
            setCryptos(dbCryptos);
          })
      });
    } catch (error) {
      Alert.alert("ERROR", "Could not retrieve any users")
    }
  }

  const getSingleCrypto = async (id: number) => {
    try {
      db.transaction(async tx => {
        tx.executeSql(`
          SELECT * FROM Cryptos WHERE Id = ${id}
        `, [], async (tx, res) => {
          console.log("Inside getSingleCrypto", res.rows.item(0));
          const response:Crypto = res.rows.item(0);    
          setSingleCrypto(response);
          return response;
        })
      })
    } catch (error) {
      
    }
  }

  const setData = async (name: string, price: string, quantity: number) => {
    if (name.length == 0 || price.toString().length == 0 || quantity.toString().length == 0) {
      Alert.alert('Warnign!', 'Please make sure to have data!')
    }
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          `INSERT INTO Cryptos (name, price, quantity) VALUES (?, ?, ?)`, [name, price, quantity])
      })
      Alert.alert("Crypto was inserted");
      getData();
    } catch (error) {
      Alert.alert("Error", error);
    }
  }

  const updateData = async (id: number, name: string, price: string, quantity: number) => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`
          UPDATE Cryptos 
          SET name = '${name}', price = '${price}', quantity = ${quantity}
          WHERE Id = ${id}
        `)
      })
      getData();
    } catch (error) {
      
    }
  }

  const deleteData = async (id: number) => {
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`
          DELETE FROM Cryptos where Id = ${id}; 
        `)
      })
    } catch (error) {
      Alert.alert("The deletion wasn't able to be done");
    }
  }

  return (
    <DatabaseContext.Provider value={{
      cryptos,
      users,
      singleCrypto,
      createTable,
      getData,
      getSingleCrypto,
      setData,
      updateData,
      deleteData
    }}>
      {children}
    </DatabaseContext.Provider>
  )

}
