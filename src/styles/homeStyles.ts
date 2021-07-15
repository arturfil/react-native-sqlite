import { StyleSheet } from "react-native";

export const homeScreenStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderRow: {
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
  subHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listBox: {
    flex: 12,
  },
  priceBox: {
    flex: 1,
    marginTop: 20,
  },
  priceText: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
