import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface BProps {
  title: string,
  func: Function,
  top: number
}

const CustomButton = ({title, func, top}: BProps) => {
  return (
    <View style={[style.btnContainer, {marginTop: top}]}>
      <TouchableOpacity
        onPress={() => func()}
        style={style.btn}
      >
        <Text style={style.btnTxt}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  btnContainer: {
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#64ed71',
    // backgroundColor: '#64ed71',
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 13,
    borderRadius: 6,
    textAlignVertical: 'bottom',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTxt: {
    fontSize: 20,
    color: '#ffffff'
  }
})

export default CustomButton
