import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Crypto } from '../interfaces/Crypto';
import { User } from '../interfaces/User';

type DataBaseContextProps = {
  cryptos: Crypto[];
  user: User;
  currentPrice: number;
  singleCrypto: Crypto;
  currentTotal: number;
  initialInvs: number;
  getData: () => Promise<void>;
  createUser: (name: string) => Promise<void>;
  getPrice: () => Promise<void>;
  getSingleCrypto: (id: number) => Promise<void>;
  createTable: () => Promise<void>;
  setData: (name: string, price: string, quantity: number) => Promise<void>;
  updateData: (id: number, name: string, price: string, quantity: number) => Promise<void>;
  editUser: (id: number, name: string) => Promise<void>
  deleteData: (id: number) => Promise<void>;
}

export const DatabaseContext = createContext({} as DataBaseContextProps);

export const DatabaseProvider = ({ children }: any) => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [singleCrypto, setSingleCrypto] = useState<Crypto>({
    Id: 0,
    name: '',
    price: '',
    quantity: 0,
  });
  const [currentTotal, setCurrentTotal] = useState<number>(0); 
  const [initialInvs, setInitialInvs] = useState<number>(0)
  const [user, setUser] = useState<User>({
    Id: 0,
    Name: ''
  });

  useEffect(() => {
    createTable();
    createUserTable();
    getPrice();
    getUser();
    getData();
  }, [])

  useEffect(() => {
    getPorfolioValue();
  }, [cryptos, currentPrice])

  const getPorfolioValue = () => {
    let current:number = 0;
    let inv:number = 0;
    if (cryptos.length <= 0) return;
    cryptos.forEach(c => {
      current += (currentPrice * c.quantity)
      inv += (parseFloat(c.price) * c.quantity)
    })
    setCurrentTotal(current);
    setInitialInvs(inv);
  }

  const db = SQLite.openDatabase({
    name: 'rnsqlite.db',
    location: 'default',
  },
    () => { },
    error => {
      console.log(error);
    }
  )

  interface Coin {
    dogecoin: Currency
  }

  interface Currency {
    usd?: number
  }


  const getPrice = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd');
    const price: Coin = await res.json();
    console.log(price.dogecoin.usd);
    if (price.dogecoin.usd)
      setCurrentPrice(price.dogecoin.usd)
    else
      return;
  }

  const createUserTable = async () => {
    db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS
        Users
        (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT)
      `)
    })
  }

  const createUser = async (name: string) => {
    try {
      db.transaction(tx => {
        tx.executeSql(`
          INSERT INTO Users (Name)
          VALUES (?)
        `, [name])
      })
      getUser();
    } catch (error) {
      console.log(error);
    }
  }

  const editUser = async (id: number, name: string) => {
    try {
      db.transaction(tx => {
        tx.executeSql(`
          UPDATE Users 
          SET Name = '${name}'
          WHERE Id = '${id}'
        `)
      })
      getUser();
    } catch (error) {
      console.log(error);
    }
  }

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
        DROP TABLE Users;
      `)
    })
  }

  const getUser = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(`
          SELECT * FROM Users
        `, [], (tx, res) => {
          for (let i = 0; i < res.rows.length; i++) {
            let user = res.rows.item(i);
            setUser(user);
          }
        })
      })
    } catch (e) {
      console.log(e);
    }
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
          const response: Crypto = res.rows.item(0);
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
      // Alert.alert("Crypto Purchase was created");
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
      getData();
    } catch (error) {
      Alert.alert("The deletion wasn't able to be done");
    }
  }

  return (
    <DatabaseContext.Provider value={{
      cryptos,
      currentPrice,
      createUser,
      user,
      singleCrypto,
      createTable,
      getData,
      currentTotal,
      initialInvs,
      getPrice,
      getSingleCrypto,
      setData,
      updateData,
      editUser,
      deleteData
    }}>
      {children}
    </DatabaseContext.Provider>
  )

}
