import { StyleSheet } from "react-native";
import { COLORS } from "./Constants";

export const globalStyles = StyleSheet.create({
  viewContainer: {
    margin: 20,
    height: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputBox: {
    marginTop: 20,
    flex: 1
  },
  inputLabel: {
    marginTop: 10,
    color: "#00af00"
  },
  input: {
    minHeight: 50,
    borderRadius: 6,
    marginTop: 5,
    borderColor: 'lightgrey',
    color: COLORS.black,
    fontSize: 16,
    borderWidth: 2,
    paddingLeft: 20
  }
})