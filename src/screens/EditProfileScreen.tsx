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
  const {user, createUser, editUser} = useContext(DatabaseContext);
  const { Id, name, onChange, setFormValue } = useForm({
    Id: 0,
    name: 'User Name Not Set'
    // name: 'User Name Not Set'
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.Name,
        Id: user.Id
      })
    }
  }, [])

  const createOrEditUser = (name: string) => {
    if (user) {
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
        style={globalStyles.input}
        placeholder="Enter Name" />
      <CustomButton top={20} title="Set Name" func={() => createOrEditUser(name)} />
    </View>
  )
}

export default EditProfileScreen
