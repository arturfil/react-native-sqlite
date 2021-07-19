import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput } from 'react-native'
import { View } from 'react-native'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { useForm } from '../hooks/useForm'
import { CryptoStackParams } from '../navigation/CryptosNavigation'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

interface Props extends StackScreenProps<CryptoStackParams, 'EditScreen'> {}; 

const EditScreen = ({navigation, route}: Props) => {
  const {getSingleCrypto, singleCrypto, updateData} = useContext(DatabaseContext)
  const { routedId = 0, routedName } = route.params;
  const { Id, name, price, quantity, onChange, setFormValue} = useForm({
    Id: routedId,
    name: '',
    price: '',
    quantity: 0
  });

  useEffect(() => {
    loadCrypto();
  }, [])

  const loadCrypto = async () => {
    if (routedId === 0) {
      Alert.alert("Id is null")
      return;
    }
    getSingleCrypto(routedId)
    
    setFormValue({
      Id: routedId,
      name: singleCrypto.name,
      price: singleCrypto.price,
      quantity: singleCrypto.quantity
    })
  }

  const editCrypto = () => {
    updateData(Id, name, price, quantity);
    navigation.navigate('HomeScreen');
  }

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Edit your Stock
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
          value={quantity?.toString()} 
          style={style.input} 
          keyboardType="number-pad" 
          placeholder="Enter Enter quantity" />
        <CustomButton top={20} title="Edit Crypto" func={() => updateData(Id, name, price, quantity)} />
        <CustomButton top={10} title="Delete Crypto" func={() => console.log("Delete")}/>
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

export default EditScreen;

