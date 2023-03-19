import { Pressable, TouchableOpacity } from "react-native";
import Styling from "./Styling";

export default function CustomButtonSecondary({text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={Styling.touchableOpacity}>
            <Text style={Styling.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}