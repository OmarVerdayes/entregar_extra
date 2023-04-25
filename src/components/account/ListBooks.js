import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Toast from "react-native-toast-message";
import { map } from 'lodash';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from "../../utils/BaseURL"
import { useEffect } from 'react';
import {setLibro} from "../../comodin/DatosLibros"

export default function ListBooks() {
  const [LBooks, setLBooks] = useState([]);
  const navigation = useNavigation();

  const [dataDBook, setDataDBook] = useState([]);

  useEffect(() => {

    const getBooks = () => {
      try {
        const URL = `http://${baseURL}:8080/api/book/`
        const response = fetch(URL,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        ).then((response) => response.json()).then((data) => {
          setLBooks(data.data);

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
    getBooks();

    return () => {

    };
  }, []);


  const irRegistrar = () => {
    navigation.navigate("registerBooks");
  }

  const irUpdate = (id, name, author, pages, year) => {
    setLibro(id,name,author,pages,year);
    navigation.navigate("updateBooks");
  }

  const deleteBooks = async (id, name, author, pages, year) => {
    try {

      const URL = `http://${baseURL}:8080/api/book/`
      const response = await fetch(URL,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "id": id,
            "name": name,
            "author": author,
            "pages": pages,
            "year": year
          })
        }
      );
      const json = await response.json();
      setDataDBook(json.data);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: "Exito!",
        text2: "Libro eliminado "
      })




    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "el libro ya a sido eliminado",
      });
    }
  };


  return (
    <View>
      {
        LBooks.map((item) => (
          <View key={"V" + item.id} style={styles.cont} >
            <View>
              <Text ><Text style={styles.title}>Nombre:</Text> {`${item.name}`}</Text>
              <Text ><Text style={styles.title}>Autor:</Text> {`${item.author} `}</Text>
              <Text ><Text style={styles.title}>Numero de paginas:</Text> {`${item.pages}`}</Text>
              <Text><Text style={styles.title}>Año:</Text> {`${item.year}`}</Text>
            </View>
            <View style={styles.alin}>
              <Button key={"U" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnU} onPress={() => irUpdate(item.id, item.name, item.author, item.pages, item.year)}
                icon={
                  <Icon type="material-community" name="pencil" iconStyle={styles.icon} />
                }
              />
              <Button key={"D" + item.id} containerStyle={styles.containerBtn} buttonStyle={styles.btnD} onPress={() => deleteBooks(item.id, item.name, item.author,item.pages, item.year)}
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
    marginTop:-60,
    margin:5

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