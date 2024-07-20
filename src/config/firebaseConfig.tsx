import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXxtErmNZBLHpPiKl9LfMJYiqw6OEGm8c",
  authDomain: "ministore-6f6b6.firebaseapp.com",
  projectId: "ministore-6f6b6",
  storageBucket: "ministore-6f6b6.appspot.com",
  messagingSenderId: "1091427197754",
  appId: "1:1091427197754:web:f3e77124b56342c8bba603",
  databaseURL: "https://ministore-6f6b6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  //INICIALIZAR REALTIME DATABASE Y OBTENER UNA REFERENCIA AL SERVICIO
  export const dbRealTime = getDatabase(firebase);