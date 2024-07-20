import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DetalleProducto from "../screens/HomeScreen/DetalleProducto";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../screens/theme/styles";

// INTERFACE - rutas de screen para navigator dinamico
interface Routes {
  name: string;
  screen: React.ComponentType<any>; // no se estaba importando bien y esto fue la unica solucion
}

// ARRAY rutas - usuario autenticado
const routesAuth: Routes[] = [
  { name: "HomeScreen", screen: HomeScreen },
  { name: "DetalleProducto", screen: DetalleProducto },
];

// ARRAY rutas - usuario no autenticado
const routesNoAuth: Routes[] = [
  { name: "LoginScreen", screen: LoginScreen },
  { name: "RegisterScreen", screen: RegisterScreen },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  // HOOK USESTATE: verificar si el usuario está autenticado
  const [isAuth, setisAuth] = useState<boolean>(false);

  // HOOK USESTATE manipular la carga del activity indicator
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HOOK USE EFFECT: validar el estado de autenticacion
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      // VALIDAR SI EL USUARIO ESTA AUTENTICADO
      if (user) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.root}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <Stack.Navigator>
          {isAuth
            ? routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }} // No mostrar el encabezado para HomeScreen y DetalleProducto
                  component={item.screen}
                />
              ))
            : routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))}
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
