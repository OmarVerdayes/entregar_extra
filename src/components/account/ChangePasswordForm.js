import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { email, name, password, photo, setUser } from "../../comodin/Datos"
import { baseURL } from "../../utils/BaseURL";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordForm(props) {
  const { close } = props;
  const [password, setPassword] = useState(false);

  const navigation = useNavigation();

  const irPerfil = () => {
    navigation.navigate("profileS");
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Contraseña obligatoria"),
      newPassword: yup.string().required("Nueva contraseña obligatoria"),
      repeatNewPassword: yup.string().required("Nueva contraseña obligatoria").oneOf([yup.ref("newPassword")], "las contraseñas deben ser iguales"),
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
              "email": email,
              "name": name,
              "password": formValue.newPassword,
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
          irPerfil();
        }
        setUser(email, name, formValue.newPassword, photo);
        onReload();
        close();


      } catch (error) {
        console.log(error);

      }
    },
  });
  const showPass = () => {
    setPassword(!password);
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Contraseña actual"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar nueva contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
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
