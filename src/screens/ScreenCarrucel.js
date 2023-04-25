import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carrucel from '../components/account/Carrucel';

export default function ScreenCarrucel() {
  return (
    <View style={styles.container}>
      <Carrucel/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  