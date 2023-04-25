import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input,Button} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { baseURL } from '../../utils/BaseURL';
import {idD,nameD,lasnameD,yearsD,direccionD,setEstudiante} from "../../comodin/DatosStudent"
import { Toast } from 'react-native-toast-message/lib/src/Toast';

console.log(idD,nameD );

export default function UpdateStudents() {
  

      const navigation=useNavigation();
      const [dataUStudent, setDataUStudent] = useState([]);


      const irEstudiantes=()=>{
        setEstudiante("","","","","");
        navigation.navigate("students")
      }


      const formik = useFormik({
        initialValues:{
          name:nameD,
          lastname:lasnameD,
          years:yearsD,
          domicilio:direccionD
        },
        validationSchema:yup.object({
          name:yup.string().required("Nombre(s) obligatorio"),
          lastname:yup.string().required("Apellido(s) obligatorio"),
          years:yup.number().required("Edad obligatoria"),
          domicilio:yup.string().required("Domicilio obligatirio")
  
        }),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
          try {
            const URL = `http://${baseURL}:8080/api/student/`
            const response = await fetch(URL,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  "name": formValue.name,
                  "lastname": formValue.lastname,
                  "years": formValue.years,
                  "direccion":formValue.domicilio,
                  "id":idD.toString()
                })
              }
            );
            const json = await response.json();
            setDataUStudent(json.data);
            if (dataUStudent == null ||dataUStudent == [] ) {
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
        <View style={styles.viewForm}>
          <Text></Text>
            <Input placeholder='Nombre' defaultValue={nameD}  containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("name",text)} errorMessage={formik.errors.name}/>
            <Input placeholder='Lasname' defaultValue={lasnameD}  containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("lastname",text)} errorMessage={formik.errors.lastname}/>
            <Input placeholder='Edad'defaultValue={yearsD.toString()}  containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("years",text)} errorMessage={formik.errors.years}/>
            <Input placeholder='Domicilio' defaultValue={direccionD}  containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("domicilio",text)} errorMessage={formik.errors.domicilio}/>
            <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
            <Button title="Cancelar" containerStyle={styles.containerBtn} buttonStyle={styles.btnC} onPress={()=>irEstudiantes()}/>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      viewForm:{
        marginTop:30
      },
      input:{
        width:"100%",
        margginTop:20
      },
      icon:{
        color:"#C1C1C1"
      },
      containerBtn:{
        width:"95%",
        marginTop:20,
        alignSelf:"center"
      },
      btn:{
        backgroundColor:"blue"
      },
      btnC:{
          backgroundColor:"red"
        }
    })