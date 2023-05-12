import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import sharedStyles from './components/Styling';
import Introduction from './pages/Introduction';
import PairFound from './pages/PairFound';
import PairManually from './pages/PairManually';
import Connected from './pages/Connected';
import { useEffect, useRef, useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

export default function App() {

  let manager = new BleManager();
  const [page, setPage] = useState("Introduction");
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [inputLanguage, setInputLanguage] = useState("en-US");
  const [outputLanguage, setOutputLanguage] = useState("en");

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const fadeBetween = (page, onChange = () => {}) => {
    fadeOut();
    setTimeout(() => {
      setPage(page)
      onChange();
      fadeIn();
    }, 200);
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={sharedStyles.container}>
      <Animated.View style={{width: "100%", height: "100%", opacity: fadeAnimation}}>
        {page == "Introduction" && <Introduction setPage={fadeBetween} manager={manager} setSelectedDevice={setSelectedDevice}/>}
        {page == "Pair Found" && <PairFound setPage={fadeBetween} manager={manager} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>}
        {page == "Pair Manually" && <PairManually setPage={fadeBetween} manager={manager} setSelectedDevice={setSelectedDevice}/>}
        {page == "Connected" && <Connected setPage={fadeBetween} manager={manager} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} setOutputLanguage={setOutputLanguage} outputLanguage={outputLanguage} inputLanguage={inputLanguage} setInputLanguage={setInputLanguage}/>}
      </Animated.View>
    </View>
  );
}