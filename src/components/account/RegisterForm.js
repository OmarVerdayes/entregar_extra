import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button, Icon } from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { baseURL } from "../../utils/BaseURL"

export default function RegisterForm() {
  const navigation = useNavigation();
  const [password, setPassword] = useState(false);
  const [rpassword, setrpassword] = useState(false);
  const [dataRegister, setDataRegister] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatedPassword: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("Formato de correo no valido").required("Email obligatorio"),
      password: yup.string().required("Contraseña obligatoria"),
      repeatedPassword: yup.string().required("Repita la contraseña").oneOf([yup.ref('password'), null], "Las contraseñas no coinciden")
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const URL = `http://${baseURL}:8080/api/users/`
        const response = await fetch(URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "email": formValue.email,
              "password": formValue.password
            })
          }
        );
        const json = await response.json();
        setDataRegister(json.data);
        console.log(dataRegister);
        if (dataRegister === null) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al registrar la cuenta"
          })
        } else {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: "Exito!",
            text2: "usuario añadido correctmente"
          })
          navigation.navigate("menu");
        }

      } catch (error) {
        console.log(error, "error de registro")
      }
    }
  })
  const showPass = () => {
    setPassword(!password);
  }
  const showRpass = () => {
    setrpassword(!rpassword);
  }
  return (
    <View style={styles.viewForm}>
      <Text></Text>
      <Input placeholder='Correo electronico' containerStyle={styles.input} rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />} onChangeText={text => formik.setFieldValue("email", text)} errorMessage={formik.errors.email} />
      <Input placeholder='Contraseña' secureTextEntry={password ? false : true} containerStyle={styles.input} rightIcon={<Icon type='material-community' name={password ? 'eye-off-outline' : "eye-outline"} iconStyle={styles.icon} onPress={showPass} />} onChangeText={text => formik.setFieldValue("password", text)} errorMessage={formik.errors.password} />
      <Input placeholder='Repetir contraseña' secureTextEntry={rpassword ? false : true} containerStyle={styles.input} rightIcon={<Icon type='material-community' name={rpassword ? 'eye-off-outline' : "eye-outline"} iconStyle={styles.icon} onPress={showRpass} />} onChangeText={text => formik.setFieldValue("repeatedPassword", text)} errorMessage={formik.errors.repeatedPassword} />
      <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
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
  }
})