import React, { useContext } from 'react'
import { Alert, StyleSheet, TextInput } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { useForm } from '../hooks/useForm'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

const AddStockScreent = () => {
  const { setData } = useContext(DatabaseContext)
  const { name, price, quantity, onChange, setFormValue } = useForm({
    name: '',
    price: '',
    quantity: 0
  })

  const createPurchse = () => {
    setData(name, price, quantity);
    Alert.alert("New purchase was created");
    setFormValue({name: '', price: '', quantity: 0});
  }

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Add your stock
      </Text>
      <View style={style.inputBox}>
        <TextInput 
          onChangeText={value => onChange(value, 'name')} 
          value={name} 
          style={style.input} 
          placeholder="Enter Name" />
        <TextInput 
          onChangeText={value => onChange(value, 'price')} 
          value={price} 
          style={style.input} 
          keyboardType="number-pad" 
          placeholder="Enter Price at Purchase" />
        <TextInput 
          onChangeText={value => onChange(value, 'quantity')} 
          value={quantity.toString()} 
          style={style.input} 
          keyboardType="number-pad" 
          placeholder="Enter Enter quantity" />
        <CustomButton top={20} title="Create Crypto Purchase" func={() => createPurchse() } />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  inputBox: {
    marginTop: 20,
    flex: 1
  },
  input: {
    borderRadius: 6,
    marginTop: 20,
    borderColor: 'lightgrey',
    color: COLORS.black,
    // fontWeight: 'bold',
    fontSize: 16,
    borderWidth: 2,
    paddingLeft: 20
  }
})

export default AddStockScreent
