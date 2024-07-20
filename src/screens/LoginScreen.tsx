import React, { useState } from "react";
import { SafeAreaView, ImageBackground, View, ScrollView } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "./theme/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

// Imagen de fondo
const backgroundImage = require("../../assets/backgroundLoginScreen.png");

interface FormLogin {
  email: string;
  password: string;
}

interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#ffff",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  };

  const handleLoginUser = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos",
        color: "#890E0E",
      });
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: "Credenciales Incorrectas",
        color: "#890E0E",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.root}>
          <View style={styles.root}>
            <Text variant="headlineLarge">Inicia Sesión</Text>
            <TextInput
              label="Correo"
              mode="outlined"
              placeholder="Escriba su correo"
              keyboardType="email-address"
              onChangeText={(value) => handleSetValues("email", value)}
              style={styles.inputAncho}
            />
            <TextInput
              label="Contraseña"
              mode="outlined"
              placeholder="Escriba su contraseña"
              onChangeText={(value) => handleSetValues("password", value)}
              secureTextEntry={hiddenPassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setHiddenPassword(!hiddenPassword)}
                />
              }
              style={styles.inputAncho}
            />
            <Button
              icon="account-circle"
              mode="contained"
              onPress={handleLoginUser}
              style={[styles.buttons, { width: "90%" }]}
            >
              Ingresar
            </Button>
            <Snackbar
              visible={showMessage.visible}
              onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
              style={{ backgroundColor: showMessage.color }}
            >
              {showMessage.message}
            </Snackbar>
            <Text
              style={styles.textRedirectLogin}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({ name: "RegisterScreen" })
                )
              }
            >
              No tienes una cuenta? Regístrate aquí!
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
