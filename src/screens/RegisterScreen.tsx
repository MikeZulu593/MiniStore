import React, { useState } from "react";
import { SafeAreaView, ImageBackground, View, ScrollView } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "./theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";

const backgroundImage = require("../../assets/backgroundRegisterScreen.png");

interface FormRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

type RootStackParamList = {
  LoginScreen: undefined;
};

type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, "LoginScreen">;

export const RegisterScreen = () => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#ffff",
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const handleSetValues = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  };

  const handleRegisterUser = async () => {
    if (!formRegister.email || !formRegister.password || !formRegister.confirmPassword) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos",
        color: "#890E0E",
      });
      return;
    }

    if (formRegister.password !== formRegister.confirmPassword) {
      setShowMessage({
        visible: true,
        message: "Las contraseñas no coinciden",
        color: "#890E0E",
      });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, formRegister.email, formRegister.password);
      navigation.navigate("LoginScreen");
    } catch (ex) {
      console.log(ex);
      setShowMessage({
        visible: true,
        message: "Error al registrar usuario",
        color: "#890E0E",
      });
    }
  };

  const isFormValid = () => {
    return formRegister.email && formRegister.password && formRegister.confirmPassword;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.root}>
          <View style={styles.root}>
            <Text variant="headlineLarge">Regístrate</Text>
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
                <TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />
              }
              style={styles.inputAncho}
            />
            <TextInput
              label="Confirmar Contraseña"
              mode="outlined"
              placeholder="Confirme su contraseña"
              onChangeText={(value) => handleSetValues("confirmPassword", value)}
              secureTextEntry={hiddenPassword}
              right={
                <TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />
              }
              style={styles.inputAncho}
            />
            <Button
              icon="account-circle"
              mode="contained"
              onPress={handleRegisterUser}
              disabled={!isFormValid()}
              style={[styles.buttons, { width: "90%" }]}
            >
              Registrarse
            </Button>
            <Text
              style={styles.textRedirectRegister}
              onPress={() => navigation.dispatch(
                CommonActions.navigate({ name: "LoginScreen" })
              )}
            >
              Ya tienes una cuenta? Inicia sesión aquí!
            </Text>
            <Snackbar
              visible={showMessage.visible}
              onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
              style={{ backgroundColor: showMessage.color }}
            >
              {showMessage.message}
            </Snackbar>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
