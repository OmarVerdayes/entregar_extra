import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {email,name,password,photo,setUser} from"../../comodin/Datos"
import Toast from "react-native-toast-message";
import { email, name, password, photo, setUser } from "../../comodin/Datos"
import { baseURL } from "../../utils/BaseURL";
import { useNavigation } from "@react-navigation/native";

export default function ProfileInfo(props) {


  const { setTextLoading, setVisiblLoading } = props;
  const [dattaUPhoto, setDattaUPhoto] = useState([]);
  
  const changePhoto = async() => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (!result.canceled) update(result.uri);
  };
  

  const updatePhoto = async (imgPath) => {
    const base64Image = btoa(imgPath);

    setTextLoading("Actualizando foto");
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
          "name":name,
          "password":password,
          "photo":base64Image
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
      setUser(email,name,password,base64Image);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: "Exito!",
        text2: "usuario actualizado correctamente"
      })
      irPerfil();
    }
  
    setPhoto(urlImg);
    setVisiblLoading(false);
  };
  const image = new Image();

  const fotito=(photoBase)=>{
    image.src = photoBase;
  }
  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={image}
      >
        <Avatar.Accessory size={25} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.nameUser}>{name || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#1bb0ce",
    borderRadius: 10,
    margin: 10,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#0D5BD7",
  },
  nameUser: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
