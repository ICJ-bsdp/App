import { StyleSheet } from "react-native";

export default sharedStyles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        color: "#fff",
        width: "100%",
        height: "100%",
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    text: {
        fontSize: 16,
        color: "#fff",
    },
    button: {
        padding: 10,
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    touchableOpacity: {
        color: "white",
    }
});