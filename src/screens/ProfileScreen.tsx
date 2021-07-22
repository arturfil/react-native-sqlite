import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { UsersStackParams } from '../navigation/UsersNavigation'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

interface Props extends StackScreenProps<UsersStackParams, 'ProfileScreen'> { }

const ProfileScreen = ({ navigation }: Props) => {
  const [name, setName] = useState<string>();
  const { user, currentTotal, initialInvs, currentPrice } = useContext(DatabaseContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfileScreen', {})}
          activeOpacity={0.8}
        >
          <Icon style={{ marginRight: 20 }} name="settings" color={COLORS.primary} size={24} />
        </TouchableOpacity>
      )
    })
    if (user.Name.length > 0) setName(user.Name)
    console.log("CHECK HERE", user.Name);

  })

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Profile Screen
      </Text>
      {name ? (
        <Text style={style.subTitle}>
          Welcome, {name}
        </Text>
      ) : (
        <Text style={style.subTitle}>
          User Profile Not Set
        </Text>
      )}
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Summary</Text>
      <Text style={style.customeFont}>{'\n'}
        <Text>You currently have
          <Text style={{ fontWeight: 'bold' }}> {(currentTotal / currentPrice).toFixed(2)} </Text>
          stocks
        </Text>{'\n'}
        <Text style={{ color: 'black' }}>Your Gain/Loss is $
          <Text style={currentPrice > initialInvs ? { color: 'green' } : { color: 'red' }}>{' '}
            {(currentTotal - initialInvs).toFixed(2)}
          </Text>
        </Text>{'\n'}
        <Text>And your initial Investment is
          <Text style={{ fontWeight: 'bold' }}> ${initialInvs.toFixed(2)}</Text>
        </Text>
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  subTitle: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: '600'
  },
  customeFont: {
    fontWeight: '400',
    fontSize: 18
  }
})

export default ProfileScreen
