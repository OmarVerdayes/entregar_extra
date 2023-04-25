import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { baseURL } from "../../utils/BaseURL"
import { setUser } from "../../comodin/Datos";



export default function LoginForm() {
  const [password, setPassword] = useState(false);
  const [dataLogin, setDataLogin] = useState([]);
  const navigation = useNavigation();

  

  const showPass = () => {
    setPassword(!password);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Formato de correo no valido").required("Email obligatorio"),
      password: yup.string().required("Contraseña obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (dataLogin !== null) {
          setDataLogin([]);
        }
        const URL = `http://${baseURL}:8080/api/users/login`
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
        setDataLogin(json.data);
        setDataLogin(json.data);



        if (dataLogin === null||dataLogin===[]) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Usuario o contraseña incorrectos",
          });
        } else {

          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: "Exito!",
            text2: "logeo correcto"
          })
          setUser(dataLogin.email,dataLogin.name,dataLogin.password,dataLogin.photo);
          navigation.navigate("menu");
          setDataLogin(null);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={password ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    margginTop: 20,
  },
  icon: {
    color: "#C1C1C1",
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "blue",
  },
});
