import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import sharedStyles from './components/Styling';
import Introduction from './pages/Introduction';
import PairFound from './pages/PairFound';
import PairManually from './pages/PairManually';
import Connected from './pages/Connected';
import { useState } from 'react';
import { BleManager } from 'react-native-ble-plx';



export default function App() {

  const manager = new BleManager();
  const [page, setPage] = useState("Introduction");
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <View style={sharedStyles.container}>
      {page == "Introduction" && <Introduction setPage={setPage} manager={manager} setSelectedDevice={setSelectedDevice}/>}
      {page == "Pair Found" && <PairFound setPage={setPage} manager={manager} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>}
      {page == "Pair Manually" && <PairManually setPage={setPage} manager={manager} setSelectedDevice={setSelectedDevice}/>}
      {page == "Connected" && <Connected setPage={setPage} manager={manager} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>}
    </View>
  );
}