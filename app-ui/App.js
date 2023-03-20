import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import sharedStyles from './components/Styling';
import Introduction from './pages/Introduction';
import PairFound from './pages/PairFound';
import PairManually from './pages/PairManually';
import Connected from './pages/Connected';
import { useState } from 'react';

export default function App() {

  const [page, setPage] = useState("Introduction");

  return (
    <View style={sharedStyles.container}>
      {page == "Introduction" && <Introduction setPage={setPage} />}
      {page == "Pair Found" && <PairFound setPage={setPage} />}
      {page == "Pair Manually" && <PairManually setPage={setPage} />}
      {page == "Connected" && <Connected setPage={setPage} />}
    </View>
  );
}