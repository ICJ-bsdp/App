import { Image, ScrollView, Text, View } from "react-native";
import Styling from "../components/Styling";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

export default function PairFound({setPage, manager, setSelectedDevice}) {

  const [devices, setDevices] = useState([]);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return
      }

      if (device) {
        setDevices((devices) =>
          devices.find((d) => d.id === device.id) ? devices : [...devices, device]
        ); 
      }
    });
  }

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        scanAndConnect();
        subscription.remove();
      }
    }, true);

    return () => {
      subscription.remove();
    }
  }, [])

    return (
      <View style={Styling.container}>
        <Image style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", resizeMode: "contain"}} source={require("../assets/Images/Manually/Background.png")} />
        <View style={Styling.top}>
          <Text style={Styling.heading}>Pairing Manually</Text>
          <Text style={Styling.text}>Select your SLATE from the list below</Text>
          <CustomButtonSecondary
            text={"Pair Automatically Instead"}
            onPress={() => {
                setPage("Introduction")
            }}
            textStyle={{color: "#919191"}}
          />
        </View>

        <ScrollView style={{position: "absolute", bottom: 0, width: "100%", height: "35%", backgroundColor: "#121212", borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 15}}>
          {devices.sort(
            (a, b) => (a.name && a.name.includes("SLATE") ? -1 : 1)
          ).map((device, index) => {

            if (!device.name)
            {
              return null;
            }

            return (
              <CustomButton
                key={index}
                text={device.name}
                onPress={() => {
                  setSelectedDevice(device);
                  setPage("Pair Found");
                }}
                style={{marginBottom: 15, backgroundColor: device.name && device.name.includes("SLATE") ? "#fff" : "#505050"}}
                textStyle={{color: device.name && device.name.includes("SLATE") ? "#000" : "#fff"}}
              />
            );
          })}
          <View style={{height: 15}} />
        </ScrollView>
    </View>
    );
  }