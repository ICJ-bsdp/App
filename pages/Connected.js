import { Image, Text, View, TextInput, Pressable} from "react-native";
import Styling from "../components/Styling";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";
import Dialog from "react-native-dialog";

export default function Connected({setPage, manager, setSelectedDevice, selectedDevice}) {

    const [showRenameConcern, setShowRenameConcern] = useState(true);
    const [renameNewName, setRenameNewName] = useState(null);

    const [deviceName, setDeviceName] = useState(selectedDevice.name);
    const [textFieldContent, setTextFieldContent] = useState(null);

    const writeDataToDevice = (text = null, command = false) => {
      let encoded = null;
      if (text != null)
      {
        const Buffer = require("buffer").Buffer;
        encoded = new Buffer(text).toString("base64");

        if (command)
        {
          encoded = "[CMD]" + encoded;
        }
      }

      selectedDevice.isConnected().then((connected) => {
        if (!connected) {
          return selectedDevice.connect();
        }
        return selectedDevice;
      }).then((device) => {
        return device.discoverAllServicesAndCharacteristics();
      }).then((device) => {

        if (encoded == null) {
          return
        }

        device.writeCharacteristicWithResponseForService("4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", encoded);
      }).catch((e) => {
        console.log(e);
      }
      );
    }

    useEffect(() => {
      writeDataToDevice();
    }, [])

    return (
      <View style={Styling.container}>
          <Dialog.Container
            visible={selectedDevice.name  === "SLATE Glass" && showRenameConcern}
          >
        <Dialog.Title>Rename</Dialog.Title>
        <Dialog.Description>
          Enter the name of who owns this SLATE Glass. This will make it easier to recognize in the future.
        </Dialog.Description>
        <Dialog.Input placeholder={"eg. Kevin"} onChange={(e) => {
          setRenameNewName(e.nativeEvent.text);
        }}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => {
          setShowRenameConcern(false);
        }} />
        <Dialog.Button label="Rename" onPress={() => {
          writeDataToDevice("CHANGE_NAME " + renameNewName + "'s SLATE Glass", true);
          writeDataToDevice("Renamed");
          setDeviceName(renameNewName + "'s SLATE Glass");
          setShowRenameConcern(false);
        }} />
        </Dialog.Container>

        <View style={Styling.top}>
            <Text style={Styling.heading}>{deviceName}</Text> 
            <View style={{flexDirection: "row", marginTop: 15}}>
                <Image style={Styling.buttonIcon} source={require("../assets/Images/General/Battery.png")} />
                <Text style={[Styling.text]}>{"Unknown"}</Text>
            </View>
            <CustomButtonSecondary 
                text={"Remove"}
                onPress={() => {
                    selectedDevice.cancelConnection();
                    setSelectedDevice(null);
                    setPage("Pair Manually")
                }}
                textStyle={{color: "#FF5A5A"}}
            />

            <TextInput onChange={(e) => {
              setTextFieldContent(e.nativeEvent.text);
            }} style={{padding: 15, marginBottom: 15, marginTop: 15, borderRadius: 15,  height: 200, backgroundColor: "rgba(255, 255, 255, 0.25)"}}/>
            <CustomButton
                text={"Send Custom Message"}
                onPress={() => {
                    writeDataToDevice(textFieldContent);
                }}
            />
        </View>
      </View>
    );
  }