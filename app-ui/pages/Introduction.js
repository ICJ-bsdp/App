import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

export default function Introduction({setPage}) {
  return (
    <View style={sharedStyles.container}>
        <Text style={sharedStyles.heading}>Connect Your SLATE</Text>
        <Text style={sharedStyles.text}>To pair, hold your SLATE glasses close to the phone and wait for a pop up.</Text>
        <CustomButton 
            text={"Scanning..."} 
            icon={}
        />
        <CustomButtonSecondary 
            text={"Pair Manually"}
            onPress={() => {
                setPage("Pair Manually")
            }}
        />
    </View>
  );
}