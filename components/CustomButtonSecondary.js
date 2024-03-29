import { Pressable, Text, TouchableOpacity } from "react-native";
import Styling from "./Styling";

export default function CustomButtonSecondary({text, textStyle, onPress, ...props}) {
    return (
        <TouchableOpacity onPress={onPress} style={[Styling.touchableOpacity, props.style]}>
            <Text style={[Styling.buttonTextContrast, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}