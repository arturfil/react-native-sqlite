import React, { useContext } from 'react'
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import CardTile from '../components/CardTile';
import { DatabaseContext } from '../database/DatabaseContext';
import { globalStyles } from '../styles/globalStyles';
import { homeScreenStyle } from '../styles/homeStyles';


const HomeScreen = () => {
  const {cryptos, getData, users} = useContext(DatabaseContext)

  const PortfolioHeader = () => (
    <>
      <View style={homeScreenStyle.subHheaderContainer}>
        <View style={homeScreenStyle.subHeaderRow}>
          <Text style={homeScreenStyle.subHeaderText}>
            Current Portfolio
          </Text>
          <Text style={[homeScreenStyle.subHeaderText, { color: 'green' }]}>
            $4,000.38
          </Text>
        </View>
        <View style={homeScreenStyle.subHeaderRow}>
          <Text style={homeScreenStyle.subHeaderText}>
            Initial Investement
          </Text>
          <Text style={homeScreenStyle.subHeaderText}>
            $500.00
          </Text>
        </View>
      </View>
    </>
  )

  const StockList = () => {
    return (
      <View style={homeScreenStyle.listBox}>
        <View style={homeScreenStyle.header}>
          <Text style={homeScreenStyle.headerText}>Asset</Text>
          <Text style={homeScreenStyle.headerText}>Buy Price</Text>
          <Text style={homeScreenStyle.headerText}>Current</Text>
          <Text style={homeScreenStyle.headerText}>Qty</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          { cryptos?.map((c, i) => (
            <CardTile key={c.Id} name={c.name} price={c.price} current={0.21} quantity={c.quantity} />
          ))}
           { users?.map((u, i) => (
            <Text key={i}>{u.Name} </Text>
          ))}
        </ScrollView>
      </View>
    )
  }

  const PriceTicker = () => {
    return (
      <View style={homeScreenStyle.priceBox}>
        <Text style={homeScreenStyle.priceText}>DOGE Price: $0.21</Text>
      </View>
    )
  }

  return (
    <View style={globalStyles.viewContainer}>
      {/* Header */}
      <View>
        <Text style={globalStyles.title}>
          Your Cryptos
        </Text>
      </View>
      <PriceTicker />
      <PortfolioHeader />
      <StockList />
    </View>
  )
}

export default HomeScreen
