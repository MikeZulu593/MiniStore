import React, { useState } from "react";
import { Modal, Portal, Text, Button, TextInput, IconButton, Snackbar } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../../theme/styles";

interface ModalsProps {
  showModalProfile: boolean;
  setShowModalProfile: (value: boolean) => void;
  showModalProducto: boolean;
  setShowModalProducto: (value: boolean) => void;
  formUser: { name: string };
  handleSetValues: (key: string, value: string) => void;
  handleUpdateUser: () => void;
  handleLogout: () => void;
  userAuth: any;
  newProduct: any;
  handleNewProductChange: (key: string, value: string | number) => void;
  handleSaveNewProduct: () => void;
}

const Modals: React.FC<ModalsProps> = ({
  showModalProfile,
  setShowModalProfile,
  showModalProducto,
  setShowModalProducto,
  formUser,
  handleSetValues,
  handleUpdateUser,
  handleLogout,
  userAuth,
  newProduct,
  handleNewProductChange,
  handleSaveNewProduct,
}) => {
  const [showMessage, setShowMessage] = useState<{ visible: boolean; message: string; color: string }>({
    visible: false,
    message: "",
    color: "",
  });

  const handleSaveProduct = () => {
    if (
      !newProduct.nombre ||
      !newProduct.precio ||
      !newProduct.pathImage ||
      !newProduct.descripcion ||
      !newProduct.especificaciones ||
      !newProduct.garantia ||
      !newProduct.disponibilidad
    ) {
      setShowMessage({
        visible: true,
        message: "Hey! Hay campos vacíos",
        color: "#e74c3c", //MENSAJE DE ERROR ROJO
      });
      return;
    }
    handleSaveNewProduct();
    setShowMessage({
      visible: true,
      message: "Producto añadido exitosamente",
      color: "#2ecc71", //MENSAJE EXITOSO VERDE
    });
  };

  const handleUpdateProfile = () => {
    handleUpdateUser();
    setShowMessage({
      visible: true,
      message: "Perfil actualizado exitosamente",
      color: "#2ecc71", //MENSAJE EXITOSO VERDE
    });
  };

  return (
    <Portal>
      <Modal visible={showModalProfile} onDismiss={() => setShowModalProfile(false)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={20}
            onPress={() => setShowModalProfile(false)}
            style={{ alignSelf: 'flex-end' }}
          />
          {userAuth && (
            <TextInput
              label="Correo Electrónico"
              value={userAuth.email}
              disabled
              style={styles.input}
            />
          )}
          <TextInput
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleUpdateProfile} style={styles.button}>
            Actualizar Perfil
          </Button>
          <Button mode="contained" onPress={handleLogout} style={styles.button}>
            Cerrar Sesión
          </Button>
        </View>
      </Modal>

      <Modal visible={showModalProducto} onDismiss={() => setShowModalProducto(false)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={20}
            onPress={() => setShowModalProducto(false)}
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            label="Nombre del Producto"
            value={newProduct.nombre}
            onChangeText={(value) => handleNewProductChange("nombre", value)}
            style={styles.input}
          />
          <TextInput
            label="Precio"
            value={newProduct.precio.toString()}
            onChangeText={(value) => handleNewProductChange("precio", Number(value))}
            style={styles.input}
          />
          <TextInput
            label="URL de Imagen"
            value={newProduct.pathImage}
            onChangeText={(value) => handleNewProductChange("pathImage", value)}
            style={styles.input}
          />
          <TextInput
            label="Descripción"
            value={newProduct.descripcion}
            onChangeText={(value) => handleNewProductChange("descripcion", value)}
            style={styles.input}
          />
          <TextInput
            label="Especificaciones"
            value={newProduct.especificaciones}
            onChangeText={(value) => handleNewProductChange("especificaciones", value)}
            style={styles.input}
          />
          <TextInput
            label="Garantía"
            value={newProduct.garantia}
            onChangeText={(value) => handleNewProductChange("garantia", value)}
            style={styles.input}
          />
          <TextInput
            label="Disponibilidad"
            value={newProduct.disponibilidad}
            onChangeText={(value) => handleNewProductChange("disponibilidad", value)}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleSaveProduct} style={styles.button}>
            Guardar Producto
          </Button>
        </View>
      </Modal>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </Portal>
  );
};

export default Modals;
