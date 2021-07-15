import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

const ProfileScreen = () => {
  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Profile Screen
      </Text>
      <Text style={style.subTitle}>
        {`Hello {Your name}`}
      </Text>    
      <Text style={{fontWeight: 'bold', fontSize: 18}}>Summary</Text>
      <Text>You currently have 400 stocks</Text>
      <Text>Your Gain is $4000</Text>
      <Text>And your initial Investment is $223</Text>
    </View>
  )
}

const style = StyleSheet.create({
  subTitle: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default ProfileScreen
