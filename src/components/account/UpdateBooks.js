import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import * as yup from "yup";
import { useFormik } from 'formik';
import { baseURL } from '../../utils/BaseURL';
import { useState } from 'react';
import { idD, nameD, authorD, pagesD, yearD, setLibro } from "../../comodin/DatosLibros"
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function UpdateBooks() {
  const navigation = useNavigation();
  const [dataUBook, setDataUBook] = useState([])
  const irLibros = () => {
    setLibro(0, "", "", 0, 0)
    navigation.navigate("books")
  }

  const formik = useFormik({
    initialValues: {
      name: nameD,
      author: authorD,
      pages: pagesD,
      year: yearD
    },
    validationSchema: yup.object({
      name: yup.string().required("Nombre obligatorio"),
      author: yup.string().required("Autor obligatorio"),
      pages: yup.number().required("Numero de paginas obligatorio"),
      year: yup.number().required("Año de publicaion obligatorio")

    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const URL = `http://${baseURL}:8080/api/book/`
        const response = await fetch(URL,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": formValue.name,
              "author": formValue.author,
              "pages": formValue.pages,
              "year": formValue.year,
              "id": idD,
            })
          }
        );
        const json = await response.json();
        setDataUBook(json.data);
        if (dataUBook === null || dataUBook === []) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al actualizar el libro"
          })
        } else {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: "Exito!",
            text2: "Libro actualizado correctmente"
          })
          irLibros();
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <View style={styles.viewForm}>
      <Text></Text>
      <Input placeholder='Titulo' defaultValue={nameD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("name", text)} errorMessage={formik.errors.name} />
      <Input placeholder='Autor' defaultValue={authorD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("author", text)} errorMessage={formik.errors.author} />
      <Input placeholder='Paginas' defaultValue={pagesD.toString()} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("pages", text)} errorMessage={formik.errors.pages} />
      <Input placeholder='Año' defaultValue={yearD.toString()} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("year", text)} errorMessage={formik.errors.year} />
      <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
      <Button title="Cancelar" containerStyle={styles.containerBtn} buttonStyle={styles.btnC} onPress={()=>irLibros()} />
    </View>
  )
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30
  },
  input: {
    width: "100%",
    margginTop: 20
  },
  icon: {
    color: "#C1C1C1"
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
    alignSelf: "center"

  },
  btn: {
    backgroundColor: "blue"
  },
  btnC: {
    backgroundColor: "red"
  }
})