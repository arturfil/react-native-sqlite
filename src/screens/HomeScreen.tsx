import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardTile from '../components/CardTile';
import { DatabaseContext } from '../database/DatabaseContext';
import { globalStyles } from '../styles/globalStyles';
import { homeScreenStyle } from '../styles/homeStyles';


interface Props extends StackScreenProps<any> { };

const HomeScreen = ({ navigation }: Props) => {
  const { cryptos, users, currentTotal, initialInvs, currentPrice } = useContext(DatabaseContext);

  const PortfolioHeader = () => (
    <>
      <View style={homeScreenStyle.subHheaderContainer}>
        <View style={homeScreenStyle.subHeaderRow}>
          <Text style={homeScreenStyle.subHeaderText}>
            Current Portfolio
          </Text>
          <Text style={[homeScreenStyle.subHeaderText, { color: 'green' }]}>
            ${currentTotal?.toFixed(2)}
          </Text>
        </View>
        <View style={homeScreenStyle.subHeaderRow}>
          <Text style={homeScreenStyle.subHeaderText}>
            Initial Investement
          </Text>
          <Text style={homeScreenStyle.subHeaderText}>
            ${initialInvs?.toFixed(2)}
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
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={cryptos}
          keyExtractor={(c) => String(c.Id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditScreen', {
                routedId: item.Id,
                routeName: item.name,
                routePrice: item.price,
                routeQuantity: item.quantity
              })}
            >
              <CardTile key={item.Id} name={item.name} price={item.price} current={currentPrice * item.quantity} quantity={item.quantity} />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  const PriceTicker = () => {
    return (
      <View style={homeScreenStyle.priceBox}>
        <Text style={homeScreenStyle.priceText}>DOGE Price: ${currentPrice.toFixed(4)}</Text>
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
