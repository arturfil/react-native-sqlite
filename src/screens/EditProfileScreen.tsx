import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { create } from 'react-test-renderer'
import CustomButton from '../components/CustomButton'
import { DatabaseContext } from '../database/DatabaseContext'
import { useForm } from '../hooks/useForm'
import { UsersStackParams } from '../navigation/UsersNavigation'
import { COLORS } from '../styles/Constants'
import { globalStyles } from '../styles/globalStyles'

interface Props extends StackScreenProps<UsersStackParams, 'EditProfileScreen'> {}; 

const EditProfileScreen = ({navigation}: Props) => {
  const {users, createUser, editUser} = useContext(DatabaseContext);
  const { Id, name, onChange, setFormValue } = useForm({
    Id: 0,
    name: 'User Name Not Set'
    // name: 'User Name Not Set'
  });

  useEffect(() => {
    if (users) {
      setFormValue({
        name: users.Name,
        Id: users.Id
      })
    }
  }, [])

  const createOrEditUser = (name: string) => {
    if (users.length <= 0) {
      createUser(name)
    } else {
      editUser(Id, name) 
    }
    navigation.navigate('ProfileScreen')
  } 

  return (
    <View style={globalStyles.viewContainer}>
      <Text style={globalStyles.title}>
        Edit Profile Screen
      </Text>
      <TextInput
        onChangeText={value => onChange(value, 'name')}
        value={name}
        style={style.input}
        placeholder="Enter Name" />
      <CustomButton top={20} title="Set Name" func={() => createOrEditUser(name)} />
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


export default EditProfileScreen