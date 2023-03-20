import { StyleSheet } from "react-native";

export default sharedStyles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        color: "#fff",
        width: "100%",
        height: "100%",
    },
    top: {
        marginTop: 100,
        marginBottom: 50,
        marginLeft: 25,
        marginRight: 25,
    },
    bottom: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        marginTop: 100,
        marginBottom: 100,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    text: {
        fontSize: 16,
        color: "#919191",
    },
    textWhite: {
        fontSize: 16,
        color: "#fff",
    },
    button: {
        padding: 20,
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
        alignSelf: "center"
    },
    buttonText: {
        color: "#000",
    },
    buttonTextContrast: {
        color: "#919191",
        marginTop: 15,
        textDecorationLine: 'underline',
    }
});