import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListStudents from "../components/account/ListStudents"
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function StudentsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <ListStudents />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})