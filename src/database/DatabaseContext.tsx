import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Crypto } from '../interfaces/Crypto';
import { User } from '../interfaces/User';

type DataBaseContextProps = {
  cryptos: Crypto[];
  users: User[];
  getData: () => Promise<void>;
  createTable: () => Promise<void>;
  setData: (name: string, price: string, quantity: number) => Promise<void>;
  updateData: (id: number, name: string, price: string, quantity: number) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
}

export const DatabaseContext = createContext({} as DataBaseContextProps);

export const DatabaseProvider = ({ children }: any) => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // getData2();
    createTable();
    getData();
    // setData('Doge 2','0.25053', 500);    
    // deleteData(3)
    // updateData(5, "DogeCoin3", '0.05326', 1800);
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
      createTable,
      getData,
      setData,
      updateData,
      deleteData
    }}>
      {children}
    </DatabaseContext.Provider>
  )

}
