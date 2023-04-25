import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ProfileInfo from "../components/account/ProfileInfo";
import Loading from "../components/common/Loading";
import ProfileOptions from "../components/account/ProfileOptions";
import {user} from "../comodin/Datos";

export default function ProfileScreen() {
  console.log(user);
  const [visibleLoading, setVisiblLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const onclose = () => {
    //console.log("cerrando");
  };
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const navigation = useNavigation();
  const cerrarSesion =  () => {
    navigation.navigate("index", { screen: "index" });
  };
  return (
    <View>
      <ProfileInfo
        setTextLoading={setTextLoading}
        setVisiblLoading={setVisiblLoading}
      />
      <ProfileOptions onReload={onReload} />
      <Button
        title={"Cerrar sesión"}
        onPress={cerrarSesion}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />
      <Loading visible={visibleLoading} text={textLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomColor: "#e3e3e3",
    width: "60%",
    marginTop: 10,
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
  },
});
