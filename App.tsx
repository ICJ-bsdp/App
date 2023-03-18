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
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

function Pill({text, onPress}): JSX.Element {
  return (
    <Pressable style={styles.deviceNamesContainer} onPress={onPress}>
      <Text style={styles.deviceNamesText}>{text}</Text>
      <Image style={styles.deviceNamesIcon} source={require("./assets/images/continue.png")} />
    </Pressable>
  );
}

function App(): JSX.Element {

  const manager = new BleManager();

  const [devices, setDevices] = useState<Device[]>([]);

  const [selected, setSelected] = useState<Device | null>(null);

  const [typed, setTyped] = useState<string>("");

  console.log(devices)

  const submit = () => {
    const Buffer = require("buffer").Buffer;
    let encoded = new Buffer(typed).toString("base64");

    selected.isConnected().then((connected) => {
      if (!connected) {
        return selected.connect();
      }
      return selected;
    }).then((device) => {
      return device.discoverAllServicesAndCharacteristics();
    }).then((device) => {
      device.writeCharacteristicWithResponseForService("4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", encoded);
    }).catch((e) => {
      console.log(e);
    }
    );
  }

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error)
        return;
      }

      if (device?.name?.includes("BSDP")) {
        setDevices((devices) => {
          if (devices.find((d) => d.id === device.id)) {
            return devices;
          }
          return [...devices, device];
        });
      }
    });
  }

  useEffect(() => {
    const sub = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log("scanning")
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
      {!selected && <><Text style={styles.header}>Connect</Text>
      <Text style={styles.subHeader}>Select a device from those listed by Bluetooth below</Text>
      <ScrollView style={styles.selectMenu}contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        {
          devices.map((device: Device) => {
            return <Pill text={device.name + "(" + device.id + ")"} onPress={() => {
              manager.stopDeviceScan();
              setSelected(device);
            }}/>
          })
        }
      </ScrollView></>}
      {selected && <>
      <Text style={styles.header}>Connected</Text>
      <Text style={styles.subHeader}>{selected.name} {"(" + selected.id + ")"}</Text>
      <TextInput style={{width: "75%", borderRadius: 15, color: "black", margin: 15, height: "50%", backgroundColor: "#f2f2f2"}} 
      onChangeText={(text) => {
        setTyped(text);
      }}
      onSubmitEditing={() => {
        submit();
      }}/>
      <Pressable style={{backgroundColor: "#202020", borderRadius: 15}} onPress={() => {
        submit();
      }}>
        <Text>Submit</Text>
      </Pressable>
      </>}
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
