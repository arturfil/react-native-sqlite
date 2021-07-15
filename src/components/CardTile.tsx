import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface CardProps {
  name: string;
  price: string;
  quantity: number;
  current: number
}

const CardTile = ({name, price, current, quantity}: CardProps) => {
  return (
    <View style={style.cardContainer}>
      <View style={style.textContainer}>
        <Text>
          {name}
        </Text>
        <Text>
          {price}
        </Text>
        <Text>
          {current}
        </Text>
        <Text>
          {quantity}
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    height: 60,
    elevation: 4,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    shadowRadius: 24,
    flexDirection: 'row'

  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default CardTile
