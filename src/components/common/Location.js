import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";

export default function Location() {
  const [region, setRegion] = useState({
    latitude: 18.8505885,
    longitude: -99.2029242,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0521,
  });
  const [newPosotion, setNewPosotion] = useState({
    latitude: 18.8505885,
    longitude: -99.2029242,
  });
  const obtainLocation = (coordinate) => {
    console.log("LAS COORDENADAS SON", coordinate);
    setNewPosotion(coordinate);
  };
  const regionChange = (region) => {
    //console.log("REGION", region);
  };
  return (
    <View style={styles.viewContainer}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => {
          obtainLocation(e.nativeEvent.coordinate);
        }}
        onRegionChange={regionChange}
      >
        <Marker
          key={1}
          coordinate={{ latitude: 18.8505885, longitude: -99.2029242 }}
          title="MI PODEROZA UTEZ <3"
          description="Prro caloron >:("
          image={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png",
          }}
        >
          {/* <Image
            styles={styles.logo}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png",
            }}
          /> */}
        </Marker>
        <Circle
          radius={100}
          center={
            newPosotion /*{ latitude: 18.8505885, longitude: -99.2029242 }*/
          }
          strokeWidth={3}
          strokeColor="#0D5BD7"
          fillColor={"rgba(13,91,215,0.2)"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    padding: 0,
    marginBottom: -75,
  },
  map: {
    width: "95%",
    height: "85%",
  },
  logo: {
    height: 50,
    width: 100,
  },
});
