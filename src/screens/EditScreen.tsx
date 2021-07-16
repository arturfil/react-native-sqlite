import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { useForm } from '../hooks/useForm'
import { CryptoStackParams } from '../navigation/CryptosNavigation'
import { globalStyles } from '../styles/globalStyles'

interface Props extends StackScreenProps<CryptoStackParams, 'EditScreen'> {}; 

const EditScreen = ({navigation, route}: Props) => {
  const { id } = route.params;
  const { Id, name, price, quantity, onChange, setFormValue} = useForm({
    Id: id,
    name: '',
    price: '',
    quantity: ''
  }) 

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Edit your Stock
      </Text>
    </View>
  )
}

export default EditScreen
