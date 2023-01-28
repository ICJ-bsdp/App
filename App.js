import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Connect from './pages/Connect';
import { useState } from 'react';

export default function App() {

  const [connected, setConnected] = useState(false);

  return (
    <Connect setConnected={setConnected} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
