import { Image, ScrollView, Text, View } from "react-native";
import Styling from "../components/Styling";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

export default function PairFound({setPage}) {

  const [devices, setDevices] = useState([
    {
      name: "SLATE 1",
      id: "00:00:00:00:00:00"
    },
    {
      name: "SLATE 1",
      id: "00:00:00:00:00:00"
    },
    {
      name: "Balls",
      id: "00:00:00:00:00:00"
    },
    {
      name: "Balls",
      id: "00:00:00:00:00:00"
    }
  ]);

    return (
      <View style={Styling.container}>
        <Image style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", resizeMode: "contain"}} source={require("../assets/Images/Manually/Background.png")} />
        <View style={Styling.top}>
          <Text style={Styling.heading}>Pairing Manually</Text>
          <Text style={Styling.text}>Select your SLATE from the list below</Text>
          <CustomButtonSecondary
            style={{alignSelf: "left"}} 
            text={"Pair Automatically Instead"}
            onPress={() => {
                setPage("Introduction")
            }}
            textStyle={{color: "#919191"}}
          />
        </View>

        <ScrollView style={{position: "absolute", bottom: 0, width: "100%", height: "35%", backgroundColor: "#121212", borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 15}}>
          {devices.map((device, index) => {
            return (
              <CustomButton
                key={index}
                text={device.name}
                onPress={() => {
                  setPage("Pair Found");
                }}
                style={{marginBottom: 15, backgroundColor: device.name.includes("SLATE") ? "#fff" : "#505050"}}
              />
            );
          })}
          <View style={{height: 15}} />
        </ScrollView>
    </View>
    );
  }