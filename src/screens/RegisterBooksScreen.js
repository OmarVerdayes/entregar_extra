import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RegisterBooksForm from '../components/account/RegisterBooksForm';

export default function RegisterBooksScreen() {
  const navigation=useNavigation();

  return (
    <View>
      <RegisterBooksForm/>
    </View>
  )
}

const styles = StyleSheet.create({})