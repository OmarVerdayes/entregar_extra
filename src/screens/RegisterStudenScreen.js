import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterStudenForm from "../components/account/RegisterStudenForm"
import { useNavigation } from '@react-navigation/native';
export default function RegisterStudenScreen() {
  const navigation=useNavigation();

  return (
    <View>
      <RegisterStudenForm/>
    </View>
  )
}

const styles = StyleSheet.create({})