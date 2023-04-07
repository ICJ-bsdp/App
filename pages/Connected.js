import { Image, Text, View, TextInput, Pressable} from "react-native";
import Styling from "../components/Styling";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomButtonSecondary from "../components/CustomButtonSecondary";

import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import { AudioConfig, AudioInputStream, AudioStreamFormat, ProfanityOption, CancellationDetails, CancellationReason, NoMatchDetails, NoMatchReason, ResultReason, SpeechConfig, SpeechRecognizer, SpeechTranslationConfig, TranslationRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import LiveAudioStream from 'react-native-live-audio-stream';
import {key} from "../components/Secrets"

export default function Connected({setPage, manager, setSelectedDevice, selectedDevice}) {

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
  
    const speechTranslationConfig = SpeechTranslationConfig.fromSubscription(key, "eastus");
    speechTranslationConfig.speechRecognitionLanguage = "en-US";
    speechTranslationConfig.setProfanity(ProfanityOption.Raw);

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

        let final = text;
        if (command)
        {
          final = "CMD_" + text;
        }

        encoded = new Buffer(final).toString("base64");
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
        writeDataToDevice("CLEAR" + translations, true);
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
                    setPage("Pair Manually", () => {
                      selectedDevice.cancelConnection();
                      setSelectedDevice(null);
                    })
                }}
                textStyle={{color: "#FF5A5A"}}
            />

            <View style={{flexDirection: "row", marginTop: 15}}>
              <TextInput onChange={(e) => {
                setTextFieldContent(e.nativeEvent.text);
              }} style={{marginBottom: 15, borderRadius: 15, width: "80%", backgroundColor: "rgba(255, 255, 255, 0.25)"}}/>
              <CustomButton
                  text={"➡️"}
                  style={{marginLeft: 10, height: 50, width: 60}}
                  textStyle={{marginTop: -7}}
                  onPress={() => {
                      writeDataToDevice(textFieldContent);
                  }}
              />
            </View>

            <View style={{flexDirection: "row", marginTop: 15}}>
              <CustomButton
                  text={
                    "Enable Voice"
                  }
                  onPress={() => {
                      LiveAudioStream.start(); 
                      writeDataToDevice("On");
                    }}
              />
              <CustomButton
                  text={
                    "Disable Voice"
                  }
                  onPress={() => {
                      LiveAudioStream.stop(); 
                      writeDataToDevice("Off");
                    }}
              />
            </View>
        </View>
      </View>
    );
  }