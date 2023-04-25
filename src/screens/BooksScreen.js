import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'
import ListBooks from '../components/account/ListBooks'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export default function BooksScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <ListBooks />
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({})