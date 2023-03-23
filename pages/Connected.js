import { Image, Text, View, TextInput, Pressable} from "react-native";
import Styling from "../components/Styling";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import { AudioConfig, AudioInputStream, AudioStreamFormat, CancellationDetails, CancellationReason, NoMatchDetails, NoMatchReason, ResultReason, SpeechConfig, SpeechRecognizer, SpeechTranslationConfig, TranslationRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import LiveAudioStream from 'react-native-live-audio-stream';

export default function Connected({setPage, manager, setSelectedDevice, selectedDevice}) {

    const [lastDetectionList, setLastDetectionList] = useState([]);

    LiveAudioStream.init({
      sampleRate: 16000,
      bufferSize: 4096,
      channels: 1,
      bitsPerChannel: 16,
      audioSource: 6,
    });
  
    const pushStream = AudioInputStream.createPushStream();
  
    LiveAudioStream.on('data', (data) => {
      const pcmData = Buffer.from(data, 'base64');
      pushStream.write(pcmData);
    });
  
    const speechTranslationConfig = SpeechTranslationConfig.fromSubscription("6c1f18d17acb4e4d84c4dc228d560c3b", "eastus");
    speechTranslationConfig.speechRecognitionLanguage = "en-US";
    speechTranslationConfig.addTargetLanguage("en");
    const audioConfig = AudioConfig.fromStreamInput(
      pushStream,
      AudioStreamFormat.getWaveFormatPCM(16000, 16, 1)
    );
    const translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);

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

      translationRecognizer.recognizing = (s, e) => {
        translations = (e.result.translations.get("en"));
        writeDataToDevice("CLEARALL" + translations, true);
      };

      translationRecognizer.startContinuousRecognitionAsync(() => {
        console.log("Translation recognizer started");
      }, 
        (err) => {
          console.log(err);
        }
      );
    }, [])

    return (
      <View style={Styling.container}>
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

            <CustomButton
                text={
                  "Enable Voice Detection"
                }
                onPress={() => {
                    LiveAudioStream.start(); 
                    writeDataToDevice("On");
                  }}
            />
            <CustomButton
                text={
                  "Disable Voice Detection"
                }
                onPress={() => {
                    LiveAudioStream.stop(); 
                    writeDataToDevice("Off");
                  }}
            />
        </View>
      </View>
    );
  }