import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingTop: 20,
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    gap: 10,
  },
  buttons: {
    width: "90%",
    marginVertical: 10,
  },
  textRedirectRegister: {
    marginTop: 15,
    fontSize: 15,
    color: "#c0c0c0",
    fontWeight: "bold",
  },
  textRedirectLogin: {
    marginTop: 15,
    fontSize: 15,
    color: "#565656",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 1,
  },
  icon: {
    alignItems: "flex-end",
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  flatList: {
    flex: 1,
  },
  productContainer: {
    flexDirection: "row",
    margin: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    marginLeft: 10,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
  totalContainer: {
    padding: 20,
    backgroundColor: "lightgray",
    marginBottom: 10,
    alignItems: "center",
  },
  total: {
    fontSize: 18,
  },
  modal: {
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    gap: 10,
  },
  rootCard: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  iconProfile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  modalProfile: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    gap: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#7eb3b6",
  },
  productCard: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#cbe4e4", 
  },
  cerrarModal: {
    marginRight: 10,
  },
  rootDetail: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    gap: 7,
  },
  input: {
    backgroundColor: "#c2e8e9",
    marginBottom: 10,
  },
  inputAncho: {
    backgroundColor: "#ffff",
    marginBottom: 10,
    width: "90%", 
  },
  button: {
    backgroundColor: "#7eb3b6",
    marginBottom: 10,
  },
  invisible: {
    backgroundColor: "transparent",
  },
});
