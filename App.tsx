/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function Pill({text}): JSX.Element {
  return (
    <View style={styles.deviceNamesContainer}>
      <Text style={styles.deviceNamesText}>{text}</Text>
      <Image style={styles.deviceNamesIcon} source={require("./assets/images/continue.png")} />
    </View>
  );
}

function App(): JSX.Element {

  

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text style={styles.header}>Connect</Text>
      <Text style={styles.subHeader}>Select a device from those listed by Bluetooth below</Text>
      <ScrollView style={styles.selectMenu}contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <Pill text="Samsung iPhone Pro Galaxy S20 Plus Ultra (UUID)" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fff',
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    paddingTop: 15,
    fontSize: 50,
    color: "#272727",
    fontWeight: "bold",
  },
  subHeader: {
    paddingTop: 15,
    fontSize: 12,
    color: "#404040",
  },
  deviceNamesContainer: {
    marginTop: 15,
    padding: 10,
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white"
  },
  deviceNamesText: {
    fontSize: 12,
    color: "#404040",
  },
  deviceNamesIcon: {
    marginTop: 3,
    marginLeft: "auto",
    width: 10,
    height: 10,
  },
  selectMenu: {
    marginTop: 25,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "90%",
  }
});

export default App;
