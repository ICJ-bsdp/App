import { Image, StyleSheet, Text, View } from 'react-native';

export default function Connect({setConnected}) {

  const [devices, setDevices] = useState([]);

  useState(() => {
    
  }, []);

  return (
    <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../assets/images/backg.png')} />
        <View>
            <Text style={styles.header}>Connect Via Bluetooth</Text>
            <Text style={styles.subheader}>Talk to a device near you.</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },

  subheader: {
    fontSize: 20,
    color: '#a0a0a0',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    },
});