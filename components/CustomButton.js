import { Image, Pressable, View, Text } from "react-native";
import Styling from "./Styling";

export default function CustomButton({icon, text, onPress, textStyle, ...props}) {
    return (
        <Pressable onPress={onPress} style={[Styling.button, props.style]}>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
                {icon && <Image source={icon} style={Styling.buttonIcon} />}
                <Text style={[Styling.buttonText, textStyle]}>{text}</Text>
            </View>
        </Pressable>
    );
}