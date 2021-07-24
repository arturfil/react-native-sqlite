import { TabActions } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Alert, Keyboard, Platform, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { useForm } from '../hooks/useForm'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

const AddStockScreent = ({navigation}:any) => {
  const { setData } = useContext(DatabaseContext)
  const { name, price, quantity, onChange, setFormValue } = useForm({
    name: '',
    price: '',
    quantity: 0
  })

  const createPurchse = () => {
    setData(name, price, quantity);
    const jump = TabActions.jumpTo('Home');
    navigation.dispatch(jump)
    setFormValue({name: '', price: '', quantity: 0});
  }

  return (
    <SafeAreaView style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Add your stock
      </Text>
      <View style={globalStyles.inputBox}>
        <Text>Name</Text>
        <TextInput 
          onChangeText={value => onChange(value, 'name')} 
          value={name} 
          style={globalStyles.input} 
          placeholder="Enter Name" 
          placeholderTextColor="gray"/>
        <Text style={{marginTop: 20}}>Purchace Price</Text>
        <TextInput 
          onChangeText={value => onChange(value, 'price')} 
          value={price} 
          style={globalStyles.input} 
          returnKeyType='done'
          keyboardType={Platform.OS == 'android' ? "number-pad" : "numeric" }
          placeholder="Enter Price at Purchase" 
          placeholderTextColor="gray"/>
        <Text style={{marginTop: 20}}>Quantity</Text>
        <TextInput 
          onChangeText={value => onChange(value, 'quantity')} 
          value={quantity.toString()} 
          style={globalStyles.input} 
          returnKeyType='done'
          keyboardType={Platform.OS == 'android' ? "number-pad" : "numeric" }
          placeholderTextColor="gray" 
          placeholder="Enter Enter quantity" />
        <CustomButton top={20} title="Create Crypto Purchase" func={() => createPurchse() } />
      </View>
    </SafeAreaView>
  )
}

export default AddStockScreent
