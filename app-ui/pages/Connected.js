import { Image, Text, View } from "react-native";
import Styling from "../components/Styling";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

export default function Connected({setPage}) {

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
                text={"Connected"} 
                style={{backgroundColor: "#121212"}}
                textStyle={{color: "white"}}
            />
            <CustomButtonSecondary 
                text={"Remove"}
                onPress={() => {
                    setPage("Pair Manually")
                }}
                textStyle={{color: "#FF5A5A"}}
            />
        </View>
      </View>
    );
  }