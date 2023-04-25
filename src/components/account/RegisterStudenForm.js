import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { baseURL } from "../../utils/BaseURL"
import {idD, nameD, lastnameD,yearsD,direccionD, setEstudiante} from "../../comodin/DatosStudent"

export default function RegisterStudenForm() {
  const navigation = useNavigation();

  const [dataRStudent, setDataRStudent] = useState([]);

  const irEstudiantes=()=>{
    navigation.navigate("students");
  }

  const formik = useFormik({
    initialValues: {
      name: nameD,
      lastname: lastnameD,
      years: yearsD,
      domicilio: direccionD,
    },
    validationSchema: yup.object({
      name: yup.string().required("Nombre(s) obligatorio"),
      lastname: yup.string().required("Apellido(s) obligatorio"),
      years: yup.number("favor de ingresar un dato numerico").required("Edad obligatoria"),
      domicilio: yup.string().required("Domicilio obligatirio"),
      matricula: yup.string().required("Matricula obligatirio"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const URL = `http://${baseURL}:8080/api/student/`
        const response = await fetch(URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": formValue.name,
              "lastname": formValue.lastname,
              "years": formValue.years,
              "direccion":formValue.domicilio,
              "id":idD
            })
          }
        );
        const json = await response.json();
        setDataRStudent(json.data);
        if (dataRStudent === null ||dataRStudent === [] ) {
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
          irEstudiantes();
        }
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <View>
      <View style={styles.viewForm}>
      <Input placeholder='Nombre' defaultValue={nameD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("name", text)} errorMessage={formik.errors.name} />
      <Input placeholder='Lasname' defaultValue={lastnameD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("lastname", text)} errorMessage={formik.errors.lastname} />
      <Input placeholder='Edad' defaultValue={yearsD.toString()} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("years", text)} errorMessage={formik.errors.years} />
      <Input placeholder='Domicilio' defaultValue={direccionD} containerStyle={styles.input} onChangeText={text => formik.setFieldValue("domicilio", text)} errorMessage={formik.errors.domicilio} />
      <Button title="Registrar"  containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
    </View>
        <Button title="Cancelar" containerStyle={styles.containerBtn} buttonStyle={styles.btnC} onPress={()=>irEstudiantes()} />  

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