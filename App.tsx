/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { BleManager, Device } from 'react-native-ble-plx';

import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function Pill({text, onClick}): JSX.Element {
  return (
    <Pressable style={styles.deviceNamesContainer} onClick={onClick}>
      <Text style={styles.deviceNamesText}>{text}</Text>
      <Image style={styles.deviceNamesIcon} source={require("./assets/images/continue.png")} />
    </Pressable>
  );
}

function App(): JSX.Element {

  const manager = new BleManager();

  const [devices, setDevices] = useState<Device[]>([]);

  const [selected, setSelected] = useState<Device | null>(null);

  console.log(devices)

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        return;
      }

      //add device if not exists
      if (!devices.some((d: { id: string; }) => d.id === device.id)) {
        setDevices([...devices, device]);
      }
    });
  }

  useEffect(() => {
    const sub = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        sub.remove();
      }
    }, true);
  
    return () => {
      sub.remove();
    }
  }, []);
  

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text style={styles.header}>Connect</Text>
      <Text style={styles.subHeader}>Select a device from those listed by Bluetooth below</Text>
      <ScrollView style={styles.selectMenu}contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        {
          devices.map((device: Device) => {
            return <Pill text={device.name + "(" + device.id + ")"} onClick={() => {
              setSelected(device);
            }}/>
          })
        }
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
