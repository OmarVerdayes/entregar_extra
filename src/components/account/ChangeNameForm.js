import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {email,name,password,photo,setUser} from"../../comodin/Datos"
import { baseURL } from "../../utils/BaseURL";
import { useNavigation } from "@react-navigation/native";

export default function ChangeNameForm(props) {
  const { close, onReload } = props;

  const navigation = useNavigation();

  const irPerfil=()=>{
    navigation.navigate("profileS");
  }
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Nombre y apellido obligatorios"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const URL = `http://${baseURL}:8080/api/users/`
        const response = await fetch(URL,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "email":email,
              "name":formValue.name,
              "password":password,
              "photo":photo
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
          irPerfil();
        }
        setUser(email,formValue.name,password,photo);
        onReload();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre y apellido"
        rightIcon={{
          type: "material-community",
          name:  "account-circle-outline",
          color: "#c2c2c2",
        }}
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue(`displayName`, text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit} //cuando se envia algo
        loading={formik.isSubmitting} //cuando se este enviando algo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
    marginTop: 15,
  },
  btnStyle: {
    backgroundColor: "#0D5BD7",
  },
});
