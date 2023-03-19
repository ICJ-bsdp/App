import { Image } from "react-native";

export default function PairFound({setPage}) {
    return (
      <View style={sharedStyles.container}>
        <Text style={sharedStyles.heading}>Pairing Manually</Text>
        <Text style={sharedStyles.text}>Select your SLATE from the list below</Text>

        <CustomButton 
            text={"Name"} 
            icon={} //bluetooth
        />
    </View>
    );
  }