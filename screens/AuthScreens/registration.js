import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet, ScrollView, Platform } from "react-native";
import { SimpleLineIcons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';
import CustomAlert from './customalert';
import SuccessAlert from './successalert';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../config/appconfig';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function Registration({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConnectAlert, setShowConnectAlert] = useState(false);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [showInputAlert, setShowInputAlert] = useState(false);
    const [showRegisterAlert, setShowRegisterAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showValidAlert, setShowValidAlert] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [showPopmessage, setShowPopmessage] = useState(false);
    const [showMessagePrompt,setShowMessagePrompt] = useState("")
    // let expoprojectID = AsyncStorage.getItem('applicationID');


    const introEffect = async ()=>{

        //  check internet status
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

         //initialize the project id
         const projectExpoID = await initializeApplicationID();

        
         // register the expo project and get id
         registerForPushNotificationsAsync(projectExpoID);

    }

    useEffect(() => {
        introEffect();
        // return () => {
        //     unsubscribe();
        // };
    }, []);

    const initializeApplicationID = async () =>{
        const expoprojectID = await AsyncStorage.getItem('applicationID');
        // console.log("application id -->"+expoprojectID)
        return expoprojectID;
    }

    // const generateUUID = () => {
    //     let dt = new Date().getTime();
    //     const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         const r = (dt + Math.random()*16)%16 | 0;
    //         dt = Math.floor(dt/16);
    //         return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    //     });
    //     return uuid;
    // };    

    const navigateToLogin = async () => {
        if (!isConnected) {
            setShowConnectAlert(true);
            return;
        }

        if (name===null || name==='' || name.length < 3){
            setShowInputAlert(true);
            setShowMessagePrompt("Enter Valid Name");
            return;
        }

        if (designation===null || designation==='' || designation.length < 3){
            setShowInputAlert(true);
            setShowMessagePrompt("Enter Valid designation");
            return;
        }
        if (password===null || password==='' || password.length < 5){
            setShowInputAlert(true);
            setShowMessagePrompt("Enter Valid Password");
            return;
        }

        if (password !== confirmPassword) {
            setShowPasswordAlert(true);
            return;
        }

        setIsLoading(true);

        try {
            
            const sessionID = await AsyncStorage.getItem('sessionID');
            const deviceID = await SecureStore.getItemAsync('deviceID');
            const appToken = await AsyncStorage.getItem('appToken');
            const notificationID = await AsyncStorage.getItem('notificationID');
            const verificationID = await AsyncStorage.getItem('verificationID');

            const data = {
                name,
                designation,
                password,
                sessionID,
                deviceID,
                appToken,
                notificationID,
                verificationID
            };
            console.log(data)

            const response = await fetch(BaseURL + "app/userregister/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {

                const responseData = await response.json();
                const { status } = responseData;
                // console.log(responseData);
                if (status === "OK") {
                    await SecureStore.setItemAsync('authState', '1');
                    const { message } = responseData;
                    if (message) {
                        setShowPopmessage(message);
                    }


                setIsLoading(false);
                setShowSuccessAlert(true);
                // setTimeout(() => {
                //     setShowSuccessAlert(false);
                    
                // }, 2000);
            } else {
                const { message } = responseData;
                    if (message) {
                        setShowPopmessage(message);
                    }
            }
            } else {
                setShowRegisterAlert(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

     async function registerForPushNotificationsAsync (expoProjectID){
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          
          token = (await Notifications.getExpoPushTokenAsync({ projectId: expoProjectID})).data;
          
          await AsyncStorage.setItem('notificationID',token);
        //   console.log("Expo-device-id-->",await AsyncStorage.getItem('notificationID'));

        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Image
                        source={require('../../assets/ifm.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.centerText}>
                        <View style={styles.inputContainer}>
                            <SimpleLineIcons name="user" size={20} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Name'
                                autoCapitalize="none" 
                                onChangeText={text => setName(text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="user-graduate" size={20} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Designation'
                                autoCapitalize="none" 
                                onChangeText={text => setDesignation(text)}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="unlock" size={20} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Password'
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text => setPassword(text)} 
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="unlock" size={20} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Confirm Password'
                                autoCapitalize="none" 
                                secureTextEntry={true}
                                onChangeText={text => setConfirmPassword(text)} 
                            />
                        </View>
                    </View>
                    <View style={[styles.circle, { backgroundColor: '#FF6E00' }]}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white" onPress={navigateToLogin} />
                    </View>
                    <CustomAlert
                        visible={showConnectAlert}
                        onClose={() => setShowConnectAlert(false)}
                        message="Connect to the internet"
                    />
                    <CustomAlert
                        visible={showPasswordAlert}
                        onClose={() => setShowPasswordAlert(false)}
                        message="Confirm Password does not match"
                    />
                    <CustomAlert
                        visible={showInputAlert}
                        onClose={() =>
                            setShowInputAlert(false)
                        }
                        message={showMessagePrompt}
                    />
                    <CustomAlert
                        visible={showRegisterAlert}
                        onClose={() => setShowRegisterAlert(false)}
                        message={showPopmessage}
                    />
                    <SuccessAlert
                        visible={showSuccessAlert}
                        onClose={() => {
                            navigation.pop();
                            navigation.replace("Login");
                            setShowSuccessAlert(false)
                            }
                        }
                        message={showPopmessage}
                    />
                    <CustomAlert
                        visible={showValidAlert}
                        onClose={() => setShowValidAlert(false)}
                        message="Please enter valid data"
                    />
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerText: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FF6E00',
        width: 300,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        height: 45,
        paddingLeft: 30,
    },
    icon: {
        position: 'absolute',
        left: 3,
        zIndex: 1,
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        left: 130,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
})