import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'


import { baseURL } from "../../utils/BaseURL"
import { useState } from 'react'
import { idD, nameD, acronimD, setCarrera } from "../../comodin/DatosCarrer"


export default function UpdateCareerForm() {


  const navigation = useNavigation();

  const [dataUCareer, setDataUCareer] = useState([]);

  const irCarreras = () => {
    setCarrera("", "", "")
    navigation.navigate("career")
  }

  const formik = useFormik({
    initialValues: {
      name: nameD,
      acronim: acronimD
    },
    validationSchema: yup.object({
      name: yup.string().required("Nombre obligatorio"),
      acronim: yup.string().required("Acronimo ")
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const URL = `http://${baseURL}:8080/api/career/`
        const response = await fetch(URL,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "id": idD,
              "name": formValue.name,
              "acronim": formValue.acronim
            })
          }
        );
        const json = await response.json();
        setDataUCareer(json.data);
        if (dataUCareer === null || dataUCareer === []) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al registrar al estudiante"
          })
        } else {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: "Exito!",
            text2: "estudiante registrado correctmente"
          })
          irCarreras();
        }
      } catch (error) {
        console.log(error);

      }
    }
  })
  return (
    <View style={styles.viewForm}>
      <Text></Text>
      <Input placeholder='Nombre' defaultValue={nameD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("name", text)} errorMessage={formik.errors.name} />
      <Input placeholder='Acfronimo' defaultValue={acronimD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("acronim", text)} errorMessage={formik.errors.lastname} />
      <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
      <Button title="Cancelar" containerStyle={styles.containerBtn} buttonStyle={styles.btnC} onPress={()=>irCarreras()} />

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