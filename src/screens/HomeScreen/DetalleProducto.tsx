import React, { useEffect, useState } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Button, TextInput, Appbar } from "react-native-paper";
import { styles } from "../theme/styles";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import { ref, remove, update } from "firebase/database";

const backgroundImage =
  "https://mfiles.alphacoders.com/215/215958.jpg";

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
  DetalleProducto: { product: Product };
};

type DetalleProductoRouteProp = RouteProp<RootStackParamList, 'DetalleProducto'>;

const DetalleProducto: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<DetalleProductoRouteProp>();
  const { product } = route.params;

  const [formEditProduct, setFormEditProduct] = useState<Product>({
    id: "",
    nombre: "",
    precio: 0,
    pathImage: "",
    descripcion: "",
    especificaciones: "",
    garantia: "",
    disponibilidad: "",
  });

  useEffect(() => {
    setFormEditProduct(product);
  }, []);

  const handleSetValues = (key: string, value: string | number) => {
    setFormEditProduct({ ...formEditProduct, [key]: value });
  };

  const handleUpdateProduct = async () => {
    const dbRef = ref(dbRealTime, "productos/" + formEditProduct.id);

    await update(dbRef, {
      nombre: formEditProduct.nombre,
      precio: formEditProduct.precio,
      pathImage: formEditProduct.pathImage,
      descripcion: formEditProduct.descripcion,
      especificaciones: formEditProduct.especificaciones,
      garantia: formEditProduct.garantia,
      disponibilidad: formEditProduct.disponibilidad,
    });
    navigation.goBack();
  };

  const handleDeleteProduct = async () => {
    const dbRef = ref(dbRealTime, "productos/" + formEditProduct.id);

    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalle del Producto" />
      </Appbar.Header>
      <ScrollView style={styles.rootDetail}>
        <TextInput
          label="Nombre"
          value={formEditProduct.nombre}
          onChangeText={(value) => handleSetValues("nombre", value)}
          style={styles.input}
        />
        <TextInput
          label="Precio"
          value={formEditProduct.precio.toString()}
          onChangeText={(value) => handleSetValues("precio", Number(value))}
          style={styles.input}
        />
        <TextInput
          label="URL de Imagen"
          value={formEditProduct.pathImage}
          onChangeText={(value) => handleSetValues("pathImage", value)}
          style={styles.input}
        />
        <TextInput
          label="Descripción"
          value={formEditProduct.descripcion}
          onChangeText={(value) => handleSetValues("descripcion", value)}
          style={styles.input}
        />
        <TextInput
          label="Especificaciones"
          value={formEditProduct.especificaciones}
          onChangeText={(value) => handleSetValues("especificaciones", value)}
          style={styles.input}
        />
        <TextInput
          label="Garantía"
          value={formEditProduct.garantia}
          onChangeText={(value) => handleSetValues("garantia", value)}
          style={styles.input}
        />
        <TextInput
          label="Disponibilidad"
          value={formEditProduct.disponibilidad}
          onChangeText={(value) => handleSetValues("disponibilidad", value)}
          style={styles.input}
        />
        <Button
          mode="contained"
          icon="update"
          onPress={handleUpdateProduct}
          style={styles.button}
        >
          Actualizar Información
        </Button>
        <Button
          mode="contained"
          icon="delete"
          onPress={handleDeleteProduct}
          style={styles.button}
        >
          Eliminar este producto
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};

export default DetalleProducto;
