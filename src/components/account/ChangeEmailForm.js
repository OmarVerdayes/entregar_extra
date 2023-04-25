import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { email, name, password, photo, setUser } from "../../comodin/Datos"
import { baseURL } from "../../utils/BaseURL";
import { useNavigation } from "@react-navigation/native";

export default function ChangeEmailForm(props) {
  const { close, onReload } = props;

  const [passwordT, setPassword] = useState(false);
  const navigation = useNavigation();

  const irPerfil = () => {
    navigation.navigate("profileS");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Correo obligatorio").required("Emial obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      try {
        if (password === formValue.password) {
          const URL = `http://${baseURL}:8080/api/users/`
          const response = await fetch(URL,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                "email": formValue.email,
                "name": name,
                "password": password,
                "photo": photo
              })
            }
          );
          const json = await response.json();
          setDataUStudent(json.data);
          if (dataUStudent === null || dataUStudent === []) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Error al actualizar"
            })
          } else {
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: "Exito!",
              text2: "usuario actualizado correctamente"
            })
            setUser(formValue.email, name, password, photo);
            irPerfil();
          }
          onReload();
          close();
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error al actualizar al usuario"
          })
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
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
          // onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={passwordT ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
          //onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar correo"
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
