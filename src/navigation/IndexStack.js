import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StudentsScreen from "../screens/StudentsScreen";
import RegisterStudenScreen from "../screens/RegisterStudenScreen";
import UpdateStudenScreen from "../screens/UpdateStudenScreen";
import BooksScreen from "../screens/BooksScreen";
import UpdateBooksScreen from "../screens/UpdateBooksScreen";
import LocationScreen from "../screens/LocationScreen";
import RegisterBooksScreen from "../screens/RegisterBooksScreen";
import RegisterCareerScreen from "../screens/RegisterCareerScreen";
import CareerScreen from "../screens/CareerScreen";
import UpdateCarrerScreen from "../screens/UpdateCareerScreen";
import MenuScreen from "../screens/MenuScreen";
import SendCorreo from "../screens/SendCorreo";
import ScreenCarrucel from "../screens/ScreenCarrucel";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
export default function IndexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={IndexScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="loginS"
        component={LoginScreen}
        options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name="lacation"
        component={LocationScreen}
        options={{ title: "Ubicaion" }}
      />
      <Stack.Screen
        name="correo"
        component={SendCorreo}
        options={{ title: "Enviar correo" }}
      />
      <Stack.Screen
        name="students"
        component={StudentsScreen}
        options={{ title: "Estudiantes" }}
      />
      <Stack.Screen
        name="menu"
        component={MenuScreen}
        options={{ title: "Menu" }}
      />
      <Stack.Screen
        name="registartEstudiante"
        component={RegisterStudenScreen}
        options={{ title: "Registrar estudiante" }}
      />
      <Stack.Screen
        name="updateS"
        component={UpdateStudenScreen}
        options={{ title: "Actualizar estudiante" }}
      />
      <Stack.Screen
        name="books"
        component={BooksScreen}
        options={{ title: "Libros" }}
      />
      <Stack.Screen
        name="updateBooks"
        component={UpdateBooksScreen}
        options={{ title: "Actualizar libros" }}
      />
      <Stack.Screen
        name="registerBooks"
        component={RegisterBooksScreen}
        options={{ title: "Registrar libros" }}
      />
      <Stack.Screen
        name="registerS"
        component={RegisterScreen}
        options={{ title: "Registrarse" }}
      />
      <Stack.Screen
        name="registerCareer"
        component={RegisterCareerScreen}
        options={{ title: "Registrar libro" }}
      />
      <Stack.Screen
        name="profileS"
        component={ProfileScreen}
        options={{ title: "Informacion del usuario" }}
      />
      
      <Stack.Screen
        name="career"
        component={CareerScreen}
        options={{ title: "Lista de carreras" }}
      />
      <Stack.Screen
        name="updateCareer"
        component={UpdateCarrerScreen}
        options={{ title: "Registrar libro" }}
      />
      <Stack.Screen
        name="carrucel"
        component={ScreenCarrucel}
        options={{ title: "Registrar libro" }}
      />
    </Stack.Navigator>
  );
}
