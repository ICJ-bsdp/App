import { Image, Text, View } from "react-native";
import Styling from "../components/Styling";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import { useState } from "react";

export default function PairFound({setPage, bluetoothID}) {

    const [name, setName] = useState("Unknown Bluetooth Device");
    const [batteryPercentage, setBatteryPercentage] = useState("Unknown");

    return (
      <View style={Styling.container}>
        <View style={Styling.top}>
            <Text style={Styling.heading}>{name}</Text> 
            <View style={{flexDirection: "row", marginTop: 15}}>
                <Image style={Styling.buttonIcon} source={require("../assets/Images/General/Battery.png")} />
                <Text style={[Styling.text]}>{batteryPercentage}</Text>
            </View>
        </View>

        <View style={Styling.bottom}>
            <CustomButton 
                text={"Pair"} 
                icon={require("../assets/Images/General/Bluetooth.png")} 
                onPress={() => {
                    setPage("Connected")
                }}
            />
            <CustomButtonSecondary 
                text={"Not My Device"}
                onPress={() => {
                    setPage("Pair Manually")
                }}
            />
        </View>
    </View>
    );
  }