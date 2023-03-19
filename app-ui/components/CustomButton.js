import { Pressable } from "react-native";
import Styling from "./Styling";

export default function CustomButton({icon, text, onPress}) {
    return (
        <Pressable onPress={onPress} style={Styling.button}>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
                {icon && <Image source={icon} style={Styling.buttonIcon} />}
                <Text style={Styling.buttonText}>{text}</Text>
            </View>
        </Pressable>
    );
}