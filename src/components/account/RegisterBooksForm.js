import { StyleSheet, Text, View } from 'react-native'
import React  from 'react'
import { Input,Button } from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast  from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { baseURL } from "../../utils/BaseURL"


export default function RegisterBooksForm() {
  
    const navigation=useNavigation();
    const irMenu=()=>{
      navigation.navigate("menu");
    }

    const [dataRBook, setDataRBook] = useState([]);
    const formik = useFormik({
      initialValues:{
        name:"",
        author:"",
        editorial:"",
        pages:0,
        year:0
      },
      validationSchema:yup.object({
        name:yup.string().required("Nombre obligatorio"),
        author:yup.string().required("Autor obligatorio"),
        pages:yup.number().required("Numero de paginas obligatorio"),
        year:yup.number().required("Año de publicaion obligatorio")

      }),
      validateOnChange:false,
      onSubmit: async(formValue)=>{
        try {
          const URL = `http://${baseURL}:8080/api/book/`
          const response = await fetch(URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                "name": formValue.name,
                "author": formValue.author,
                "pages":formValue.pages,
                "year":formValue.year
              })
            }
          );
          const json = await response.json();
          setDataRBook(json.data);
          if (dataRBook === null ||dataRBook === [] ) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Error al registrar el lirbo"
            })
          } else {
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: "Exito!",
              text2: "Libro registrado correctmente"
            })
            irMenu();
          }
        } catch (error) {
           console.log(error);     
        }
      }
    })
    return (
      <View style={styles.viewForm}>
          <Input placeholder='Titulo' containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("name",text)} errorMessage={formik.errors.name}/>
          <Input placeholder='Autor' containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("author",text)} errorMessage={formik.errors.author}/>
          <Input placeholder='Paginas' containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("pages",text)} errorMessage={formik.errors.pages}/>
          <Input placeholder='Año' containerStyle={styles.input} onChangeText={text=>formik.setFieldValue("year",text)} errorMessage={formik.errors.year}/>
          <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
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