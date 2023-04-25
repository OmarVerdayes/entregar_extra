import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Toast from "react-native-toast-message";
import { map } from 'lodash';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from "../../utils/BaseURL"
import { useEffect } from 'react';
import { setCarrera } from '../../comodin/DatosCarrer';


export default function ListCareer() {
  const navigation = useNavigation();

  const [LCareer, setLCareer] = useState([]);

  const [dataDCareer, setDataDCareer] = useState([]);
  

  useEffect(() => {

    const getCareers = () => {
      try {
        const URL = `http://${baseURL}:8080/api/career/`
        const response = fetch(URL,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        ).then((response) => response.json()).then((data) => {
          setLCareer(data.data);

        }).catch((error) => console.log(error));

      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al obtener los studiantes",
        });
      }
    };
    getCareers();
    return () => {

    };
  }, []);


  //------------------------
  const irUpdate = (id, name, acronim) => {
    setCarrera(id,name,acronim)
    navigation.navigate("updateCareer");
  }

  const deleteCareer = async (id, name, acronim) => {
    try {
      const URL = `http://${baseURL}:8080/api/career/`
      const response = await fetch(URL,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "name": name,
            "acronim": acronim,
            "id": id
          })
        }
      );
      const json = await response.json();
      setDataDCareer(json.data);

      if(dataDCareer===[]||dataDCareer===null){
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: "Exito!",
          text2: "Carrera eliminada "
        })
      }else{
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al eliminar",
        });
      }

    } catch (error) {
      console.log(error);
    };
  }
  const irRegistrar = () => {
    navigation.navigate("registerCareer")
  }

  return (
    <View>
      {
        LCareer.map((item) => (
          <View key={"V" + item.id} style={styles.cont}>
            <Text>{`Acronimo: ${item.acronim}`}</Text>
            <Text>{`Nombre: ${item.name}`}</Text>

            <View style={styles.alin}>
            <Button key={"U" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnU} onPress={() => irUpdate(item.id, item.name, item.acronim)}
              icon={
                <Icon type="material-community" name="pencil" iconStyle={styles.icon} />
              }
            />

              <Button key={"D" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnD} onPress={() => deleteCareer(item.id, item.name, item.acronim)}
                icon={
                  <Icon type="material-community" name="delete" iconStyle={styles.icon} />
                }
              />
            </View>

          </View>
        ))
      }
      <Button title="Registrar" containerStyle={styles.containerBtnReg} buttonStyle={styles.btn} onPress={() => irRegistrar()} />
    </View>
  )
}

const styles = StyleSheet.create({
  alin: {
    flexDirection: "row",
    alignSelf: 'flex-end',
    marginTop: -50,
    margin: 5,
  },
  cont: {
    backgroundColor: "#BFBFBF",
    margin: 5,
    borderRadius: 5

  },
  containerBtn: {
    width: "15%",
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  containerBtnReg: {
    width: "40%",
    marginTop: 20,
    alignSelf: "center"
  },
  btn: {
    backgroundColor: "blue"
  },
  btnD: {
    backgroundColor: "red",

  },
  btnU: {
    backgroundColor: "green",

  },
  icon: {
    color: "#C1C1C1",
  },
})