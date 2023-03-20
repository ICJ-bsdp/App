import { View, Text, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import Styling from "../components/Styling";
import { useEffect } from "react";

export default function Introduction({setPage, setSelectedDevice, manager}) {

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return
      }

      if (device && device.name && device.name.includes("SLATE")) {
        manager.stopDeviceScan();
        setSelectedDevice(device);
        setPage("Pair Found");
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
        <View style={Styling.top}>
          <Text style={Styling.heading}>Connect Your SLATE</Text>
          <Text style={Styling.text}>To pair, hold your SLATE glasses close to the phone and wait for a pop up.</Text>
        </View>

        <View style={Styling.bottom}>
          <CustomButton 
              text={"Scanning..."} 
              icon={require("../assets/Images/Introduction/Scanning.png")}
          />
          <CustomButtonSecondary 
              text={"Pair Manually"}
              onPress={() => {
                  setPage("Pair Manually")
              }}
          />
        </View>
    </View>
  );
}