import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

export default function MenuScreen({user}) {
    console.log(user);
    const navigation = useNavigation();

  return (
    <View>
      <Text>indexScreen</Text>
      <Button title='Ir a lista de estudiantes' onPress={()=>navigation.navigate("students")}/>
      <Button title='Ir a lista de libros' onPress={()=>navigation.navigate("books")}/>
      <Button title='Ir a lista de carreras' onPress={()=>navigation.navigate("career")}/>
      <Button title='Ir la ubicacion' onPress={()=>navigation.navigate("lacation")}/>
      <Button title='Enviar correo' onPress={()=>navigation.navigate("correo")}/>
      <Button title='Ver carrucel' onPress={()=>navigation.navigate("carrucel")}/>
      <Button title='Perfil' onPress={()=>navigation.navigate("profileS")} />

    </View>
  )
}

const styles = StyleSheet.create({})