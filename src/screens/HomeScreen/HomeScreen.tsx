import React, { useEffect, useState } from "react";
import { View, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { Avatar, IconButton, Text, FAB, Card, Button, Snackbar } from "react-native-paper";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import { updateProfile, signOut } from "@firebase/auth";
import { ref, push, set, onValue } from "firebase/database";
import firebase from "@firebase/auth";
import { styles } from "../theme/styles";
import Modals from "./Components/Modals";
import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";

const backgroundImage = "https://mfiles.alphacoders.com/215/215958.jpg";

interface FormUser {
  name: string;
}

interface Product {
  id: string;
  nombre: string;
  precio: number;
  pathImage: string;
  descripcion: string;
  especificaciones: string;
  garantia: string;
  disponibilidad: string;
}

type RootStackParamList = {
  Inicio: undefined;
  DetalleProducto: { product: Product };
  LoginScreen: undefined;
};

type ProductosScreenNavigationProp = NavigationProp<RootStackParamList, "Inicio">;

const Productos: React.FC = () => {
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [formUser, setFormUser] = useState<FormUser>({ name: "" });
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalProducto, setShowModalProducto] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    nombre: "",
    precio: 0,
    pathImage: "",
    descripcion: "",
    especificaciones: "",
    garantia: "",
    disponibilidad: "",
  });
  const [showMessage, setShowMessage] = useState<{ visible: boolean; message: string; color: string }>({
    visible: false,
    message: "",
    color: "",
  });
  const navigation = useNavigation<ProductosScreenNavigationProp>();

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" });
    getAllProducts();
  }, []);

  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    await updateProfile(userAuth!, { displayName: formUser.name });
    setShowModalProfile(false);
    setShowMessage({
      visible: true,
      message: "Perfil actualizado exitosamente",
      color: "#2ecc71",
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserAuth(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      })
    );
  };

  const getAllProducts = () => {
    const dbRef = ref(dbRealTime, "productos");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    });
  };

  const handleNewProductChange = (key: keyof Omit<Product, "id">, value: string | number) => {
    setNewProduct({ ...newProduct, [key]: value });
  };

  const handleSaveNewProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.pathImage) {
      setShowMessage({
        visible: true,
        message: "Hey! Hay campos vacíos",
        color: "#e74c3c", // rojo para el mensaje de error
      });
      return;
    }
    const dbRef = ref(dbRealTime, "productos");
    const newProductRef = push(dbRef);
    try {
      await set(newProductRef, newProduct);
      setShowModalProducto(false);
      setNewProduct({
        nombre: "",
        precio: 0,
        pathImage: "",
        descripcion: "",
        especificaciones: "",
        garantia: "",
        disponibilidad: "",
      });
      setShowMessage({
        visible: true,
        message: "Producto añadido exitosamente",
        color: "#2ecc71", // verde para el mensaje de éxito
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  const total: number = products.reduce((total, product) => total + product.precio, 0);

  const renderItem = ({ item }: { item: Product }) => (
    <Card style={styles.productCard}>
      <Card.Cover source={{ uri: item.pathImage }} />
      <Card.Content>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productPrice}>{item.precio.toFixed(2)}</Text>
        <Button onPress={() => navigation.navigate("DetalleProducto", { product: item })}>
          Más Información
        </Button>
      </Card.Content>
    </Card>
  );

  const formatData = (data: Product[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        nombre: "",
        precio: 0,
        pathImage: "",
        descripcion: "",
        especificaciones: "",
        garantia: "",
        disponibilidad: "",
      });
      numberOfElementsLastRow++;
    }
    return data;
  };

  const numColumns = 2;

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Icon size={35} icon="account" />
          <View style={{ marginLeft: 10 }}>
            <Text variant="bodyLarge">Bienvenido</Text>
            <Text variant="labelLarge">{userAuth?.displayName}</Text>
          </View>
          <IconButton icon="account-edit" mode="contained" size={25} onPress={() => userAuth && setShowModalProfile(true)} style={styles.iconProfile} />
        </View>

        <FlatList
          style={styles.flatList}
          data={formatData(products, numColumns)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.id.includes("blank")) {
              return <View style={[styles.productCard, styles.invisible]} />;
            }
            return renderItem({ item });
          }}
          numColumns={numColumns}
        />

        <TouchableOpacity style={styles.totalContainer}>
          <Text style={styles.total}>Total: $ {total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      <Modals
        showModalProfile={showModalProfile}
        setShowModalProfile={setShowModalProfile}
        showModalProducto={showModalProducto}
        setShowModalProducto={setShowModalProducto}
        formUser={formUser}
        handleSetValues={handleSetValues}
        handleUpdateUser={handleUpdateUser}
        handleLogout={handleLogout}
        userAuth={userAuth}
        newProduct={newProduct}
        //@ts-ignore
        handleNewProductChange={handleNewProductChange}
        handleSaveNewProduct={handleSaveNewProduct}
      />

      <FAB icon="plus" style={styles.fab} onPress={() => setShowModalProducto(true)} />

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </ImageBackground>
  );
};

export default Productos;
