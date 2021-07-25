import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Platform, StyleSheet, Text, TextInput } from 'react-native'
import { View } from 'react-native'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { useForm } from '../hooks/useForm'
import { CryptoStackParams } from '../navigation/CryptosNavigation'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

interface Props extends StackScreenProps<CryptoStackParams, 'EditScreen'> { };

const EditScreen = ({ navigation, route }: Props) => {
  const { getSingleCrypto, singleCrypto, updateData, deleteData } = useContext(DatabaseContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { routedId = 0, routedName } = route.params;
  const { Id, name, price, quantity, onChange, setFormValue } = useForm({
    Id: routedId,
    name: '',
    price: '',
    quantity: 0
  });

  useEffect(() => {
    loadCrypto();
  }, [routedId])

  useEffect(() => {
    setValues()
  }, [singleCrypto])

  const loadCrypto = async () => {
    setLoading(true);
    if (routedId === 0) {
      Alert.alert("Id is null")
      return;
    }

    getSingleCrypto(Id);
    setLoading(false);
  }

  const setValues = async () => {
    setFormValue({
      Id: routedId,
      name: singleCrypto.name,
      price: singleCrypto.price,
      quantity: singleCrypto.quantity
    });
  }

  const editCrypto = () => {
    updateData(Id, name, price, quantity);
    navigation.navigate('HomeScreen');
  }

  const deleteCrypto = () => {
    deleteData(routedId);
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Edit your Stock
      </Text>
      {!loading ?
        (
          <View style={globalStyles.inputBox}>
            <Text style={globalStyles.inputLabel}>Name</Text>
            <TextInput
              onChangeText={value => onChange(value, 'name')}
              returnKeyType='done'
              value={name}
              style={globalStyles.input}
              placeholder="Enter Name" />
            <Text style={globalStyles.inputLabel}>Purchase Price</Text>
            <TextInput
              onChangeText={value => onChange(value, 'price')}
              value={price}
              style={globalStyles.input}
              returnKeyType='done'
              keyboardType={Platform.OS == 'android' ? "number-pad" : "numeric" }
              placeholder="Enter Price at Purchase" />
            <Text style={globalStyles.inputLabel}>Quantity</Text>
            <TextInput
              onChangeText={value => onChange(value, 'quantity')}
              value={quantity?.toString()}
              style={globalStyles.input}
              returnKeyType='done'
              keyboardType={Platform.OS == 'android' ? "number-pad" : "numeric" }
              placeholder="Enter Enter quantity" />
            <CustomButton top={20} title="Edit Crypto" func={() => editCrypto()} />
            <CustomButton top={10} title="Delete Crypto" func={() => deleteCrypto()} />
          </View>
        ) : (
          <Text>Loading ...</Text>
        )
      }

    </View>
  )
}

export default EditScreen;

