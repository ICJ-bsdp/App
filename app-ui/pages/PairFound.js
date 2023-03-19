import { Image } from "react-native";

export default function PairFound({setPage, bluetoothID}) {
    return (
      <View style={sharedStyles.container}>
        <Text style={sharedStyles.heading}>{bluetoothID}</Text> //name
        <View style={{flexDirection: "row"}}>
            <Image style={sharedStyles.buttonIcon} source={} /> //battery icon
            <Text style={sharedStyles.text}></Text> //battery
        </View>
        <CustomButton 
            text={"Pair"} 
            icon={} //bluetooth
        />
        <CustomButtonSecondary 
            text={"Not My Device"}
            onPress={() => {
                setPage("Pair Manually")
            }}
        />
    </View>
    );
  }