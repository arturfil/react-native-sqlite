import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'

const EditScreen = () => {
  return (
    <div>
      <View style={globalStyles.viewContainer}>
        <Text style={globalStyles.title}>
          Edit your Stock
        </Text>
      </View>
    </div>
  )
}

export default EditScreen
