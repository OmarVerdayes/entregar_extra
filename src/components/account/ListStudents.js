import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Toast from "react-native-toast-message";
import { map } from 'lodash';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from "../../utils/BaseURL"
import { useEffect } from 'react';
import { setEstuden } from '../../comodin/Datos';
import { setEstudiante } from '../../comodin/DatosStudent';

export default function ListStudents() {
  const navigation = useNavigation();

  const [LStudents, setLStudents] = useState([]);

  const [dataRStudent, setDataRStudent] = useState([]);

  useEffect(() => {

    const getStudents = () => {
      try {
        const URL = `http://${baseURL}:8080/api/student/`
        const response = fetch(URL,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        ).then((response) => response.json()).then((data) => {
          setLStudents(data.data);

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
    getStudents();

    return () => {

    };
  }, []);


  const irUpdate = (id, name, lastname, years, direccion) => {
    setEstudiante(id, name, lastname, years, direccion);
        navigation.navigate("updateS");
  }

  const deleteStudent = async (id, name, lastname, years, direccion) => {
    try {
      const URL = `http://${baseURL}:8080/api/student/`
      const response = await fetch(URL,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "name": name,
            "lastname": lastname,
            "years": years,
            "direccion": direccion,
            "id": id
          })
        }
      );
      const json = await response.json();
      setDataRStudent(json.data);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: "Exito!",
        text2: "Estudiante eliminado "
      })


    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al eliminar:el usuario ya a sido eliminado",
      });
    }
  };

  const irRegistrar = () => {
    navigation.navigate("registartEstudiante")
  }

  return (
    <View>
      {LStudents.map((item) => (
        <View key={"V" + item.id} style={styles.cont} >
          <View>
          <Text > <Text style={styles.title}>Nombre completo:</Text> {`${item.name} ${item.lastname}`}</Text>
          <Text > <Text style={styles.title}>Edad:</Text> {`${item.years}`}</Text>
          <Text > <Text style={styles.title}>Direccion:</Text> {`${item.direccion}`}</Text>
          </View>
          <View style={styles.alin}>
          <Button key={"U" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnU} onPress={() => irUpdate(item.id, item.name, item.lastname, item.years, item.direccion)}
            icon={
              <Icon type="material-community" name="pencil" iconStyle={styles.icon} />
            }
          />
          <Button key={"D" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnD} onPress={() => deleteStudent(item.id, item.name, item.lastname, item.years, item.direccion)}
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
    marginTop:-50,
    margin: 5,
  },
  cont: {
    backgroundColor: "#D9D9D9",
    margin: 5,
    borderRadius:5

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