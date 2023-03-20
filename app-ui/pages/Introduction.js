import { View, Text, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import Styling from "../components/Styling";

export default function Introduction({setPage}) {
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