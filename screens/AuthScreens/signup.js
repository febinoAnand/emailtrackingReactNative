import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import { SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import LoadingScreen from './loadingscreen'; 
import CustomAlert from './customalert';
import CustomAlertprompt from './customalertprompt';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL, serverTimeoutSeconds } from '../../config/appconfig';
import { useIsFocused } from '@react-navigation/native';

export default function Signup({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConnectAlert, setShowConnectAlert] = useState(false);
    const [showresAlert, setShowresAlert] = useState(false);
    const [showValidAlert, setShowValidAlert] = useState(false);
    const [showInValidAlert, setShowInValidAlert] = useState(false);
    const [showPromptAlert, setShowPromptAlert] = useState(false);
    const [showPopmessage, setShowPopmessage] = useState(false);
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNumber] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setShowConnectAlert(true);
            } else {
                setShowConnectAlert(false);
            }
        });
        isFocused && setIsLoading(false);
        return () => unsubscribe();
    }, [isFocused]);

    const promptNavigation = async (prompt) =>{
        try {
            const isConnected = await NetInfo.fetch().then(state => state.isConnected);
            setShowConnectAlert(!isConnected);
            if (!isConnected) return;
            const deviceID = await SecureStore.getItemAsync('deviceID');
            const appToken = await AsyncStorage.getItem('appToken');
            const sessionID = await AsyncStorage.getItem('sessionID');
            const needtochange = prompt
    
            // console.log("deviceID->",deviceID);
            // console.log("appToken->",appToken);
            // console.log("sessionID->",sessionID);
            // console.log("needtochange->",needtochange);

            //Open loading screen
            setIsLoading(true);

            
            //Start Timer 
            let timeout = false;
            const timeoutAlert = setTimeout(() => {
                setIsLoading(false);
                setShowresAlert(true);   
                timeout=true;
            }, serverTimeoutSeconds);


            //call user prompt API
            const response = await fetch(BaseURL + "app/userprompt/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceID,
                    appToken,
                    sessionID,
                    needtochange,
                }),
            });

            if(timeout===true) return;
    
            if (response.ok) {
                clearInterval(timeoutAlert);
                const responseData = await response.json();
                const { status } = responseData;
                
                // console.log(responseData);

                
                if (status === "INVALID") {
                    setShowInValidAlert(true);
                    const { message } = responseData;
                    if (message) {
                        setShowPopmessage(message);
                    }
                    setIsLoading(false);
                } else if (status === "OK") {
                    const { session_id, otp_resend_interval, otp_expiry_time } = responseData;
                    await AsyncStorage.multiSet([
                        ['sessionID', session_id],
                        ['otp_resend_interval', otp_resend_interval.toString()],
                        ['otp_expiry_time', otp_expiry_time.toString()],
                        ['is_existing_user', "true"]
                    ]);
    
                    
                    setTimeout(() => {
                    // setIsLoading(false);
                        navigation.navigate("OTP", { otp_resend_interval,  mobileNo });
                        // setIsLoading(false);
                    }, 2000);
                } else {
                    setShowValidAlert(true);
                    setIsLoading(false);
                }
            } else {
                console.error('Server request failed');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error checking internet connection:', error);
            setIsLoading(false);
        }
        


    }

    const navigateToOTP = async () => {
        try {
            const isConnected = await NetInfo.fetch().then(state => state.isConnected);
            setShowConnectAlert(!isConnected);
            if (!isConnected) return;
            const isEmailValid = validateEmail(email);
            const isMobileValid = validateMobile(mobileNo);
    
            if (!isEmailValid || !isMobileValid) {
                setShowValidAlert(true);
                return;
            }

            // save Email
            await AsyncStorage.setItem('emailID',email);

            const deviceID = await SecureStore.getItemAsync('deviceID');
            const appToken = await AsyncStorage.getItem('appToken');
            
    
            const mobileno = "+91" + mobileNo;


            //set authState to zero
            SecureStore.setItemAsync('authState','0');

            //Open loading screen
            setIsLoading(true);

            
            //Start Timer 
            let timeout = false;
            const timeoutAlert = setTimeout(() => {
                setIsLoading(false);
                setShowresAlert(true);   
                timeout=true;
            }, serverTimeoutSeconds);

            

            

            //call API
            const response = await fetch(BaseURL + "app/userauth/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceID,
                    appToken,
                    email,
                    mobileno,
                }),
            });

            //return if expired...
            if (timeout===true) return;
            clearTimeout(timeoutAlert);
            
            
            // console.log(deviceID)
            // console.log(appToken)
            // console.log(email)
            // console.log(mobileno)
            


            if (response.ok) {
                // stop the timer if repose got
                
                const responseData = await response.json();
                const { status, otp_resend_interval } = responseData;
                
                // console.log(responseData);

                
                if (status === "INVALID") {
                    setShowInValidAlert(true);
                    const { message } = responseData;
                    if (message) {
                        setShowPopmessage(message);
                    }
                    setIsLoading(false);
                } else if (status === "PROMPT") {
                    setShowPromptAlert(true);
                    const { message, session_id } = responseData;
                    if (message) {
                        setShowPopmessage(message);
                    }
                    if(session_id){
                        await AsyncStorage.setItem('sessionID',session_id);
                    }
                    setIsLoading(false);
                } else if (status === "OK") {
                    const { session_id, otp_resend_interval, otp_expiry_time, is_existing_user } = responseData;
                    await AsyncStorage.multiSet([
                        ['sessionID', session_id],
                        ['otp_resend_interval', otp_resend_interval.toString()],
                        ['otp_expiry_time', otp_expiry_time.toString()],
                        ['is_existing_user', is_existing_user.toString()]
                    ]);
    
                    
                    setTimeout(() => {
                    // setIsLoading(false);
                        navigation.navigate("OTP", { otp_resend_interval,  mobileNo });
                        // setIsLoading(false);
                    }, 2000);
                } else {
                    setShowValidAlert(true);
                    setIsLoading(false);
                }
            } else {
                console.error('Server request failed');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error checking internet connection:', error);
            setIsLoading(false);
        }
    };    

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobileNo) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobileNo);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <View style={styles.centerText}>
                    <Image
                        source={require('../../assets/ifm.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputContainer}>
                        <SimpleLineIcons name="user" size={20} color="#FF6E00" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="call-sharp" size={20} color="#FF6E00" style={styles.icon} />
                        <Text style={styles.text}>+ 91</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Mobile No'
                            value={mobileNo}
                            onChangeText={setMobileNumber}
                        />
                    </View>
                    <TouchableOpacity style={[styles.circle, { backgroundColor: '#FF6E00' }]} onPress={navigateToOTP}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            <CustomAlert
                visible={showConnectAlert}
                onClose={() => setShowConnectAlert(false)}
                message="Connect to the internet"
            />
            <CustomAlert
                visible={showresAlert}
                onClose={() => setShowresAlert(false)}
                message="Something went wrong !"
            />
            <CustomAlert
                visible={showValidAlert}
                onClose={() => setShowValidAlert(false)}
                message="Please enter valid email and mobile number"
            />
            <CustomAlert
                visible={showInValidAlert}
                onClose={() => setShowInValidAlert(false)}
                message={showPopmessage}
            />
            <CustomAlertprompt
                visible={showPromptAlert}
                onClose={() => setShowPromptAlert(false)}
                message={showPopmessage}
                onYesPress={() =>{
                    setShowPromptAlert(false);
                    promptNavigation(true);
                    // console.log("Yes pressed..")
                }}
                onNoPress={() =>{
                    setShowPromptAlert(false);
                    // console.log("No pressed..")
                    promptNavigation(false);
                }}
            />
        </ScrollView>
    );
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
    button: {
        marginTop: 200,
        left: 130
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
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
    text: {
        left:25
    }
});