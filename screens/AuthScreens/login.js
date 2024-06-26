import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image,Platform } from 'react-native';
import { SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';
import NetInfo from "@react-native-community/netinfo";
import CustomAlert from './customalert';
import SuccessAlert from './successalert';
import { format } from 'date-fns';
import { App_Token, BaseURL, timeFormat } from '../../config/appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';
import SuccessAlertPopup from './successalertpopup';

export default function Login({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConnectAlert, setShowConnectAlert] = useState(false);
    const [showFieldAlert, setShowFieldAlert] = useState(false);
    const [showPopmessage, setShowPopmessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showValidAlert, setShowValidAlert] = useState(false);
    const [showInvalidAlert,setShowInvalidAlert] = useState(false)
    const [showSuccessAlertPopUp, setShowSuccessAlertPopUp] = useState(false);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [deviceID,setDeviceID] = useState('');
    const [expoID, setExpoID] = useState("");
    const [notificationID,setNotificationID] = useState("");
    const [deviceMismatchAlert,setDeviceMismatchAlert] = useState(false);

    const clearDatas = async ()=>{
        await SecureStore.setItemAsync('authState', '0');
        await AsyncStorage.setItem('token', "");
        await AsyncStorage.setItem('notificationID',"");
        await AsyncStorage.setItem('emailID',"");
    }

    const initializeApplicationID = async () =>{
        const expoprojectID = await AsyncStorage.getItem('applicationID');
        // console.log("application id -->"+expoprojectID)
        return expoprojectID;
    }


    const introEffect = async ()=>{
        //initialize the project id
        const projectExpoID = await initializeApplicationID();

        // console.log("registration applicationID--->",projectExpoID)
        
        // register the expo project and get id
        await registerForPushNotificationsAsync(projectExpoID);
    }

    useEffect(() => {
        
        getIDs();
        introEffect();
    }, []);


    const getIDs = async ()=>{
        const emailID = await AsyncStorage.getItem("emailID");
        setDeviceID(await SecureStore.getItemAsync("deviceID"))
        setExpoID(await AsyncStorage.getItem("applicationID"))

        setUsername(emailID);
    }

    

    const generateUUID = ()=>{
        let uuid = uuidv4();
        return uuid;
    }

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
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            // console.log("projectid -->",projectId)
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          
          try{
            token = (await Notifications.getExpoPushTokenAsync({ projectId})).data;
            if(!token){
                token = generateUUID();
            }
            
          }catch(error){
            token = generateUUID();
          }
          
        //   console.log("Login NotificationID--->",token)
          setNotificationID(token);

        //   console.log("notificationID state -->", notificationID);
          await AsyncStorage.setItem('notificationID',token);

          console.log("Login Expo-device-id-->",await AsyncStorage.getItem('notificationID'));

        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            setShowFieldAlert(true);
            return;
        }
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setShowConnectAlert(true);
                return;
            }
            setIsLoading(true);
            
            // console.log("username",username)
            // console.log("password",password)
            // console.log("deviceID",deviceID)
            // console.log("app_token",App_Token)
            

            fetch(BaseURL + "app/userlogin/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    device_id: deviceID,
                    app_token: App_Token,
                    notification_id:notificationID
                }),
            })
            .then(async response => {
                
                // console.log("response==>",response);
                
                if (response.ok) {
                    console.log("expoID ==>",expoID)
                    setIsLoading(false);
                    const responseData = await response.json();
                    const { status, message, token } = responseData;
                    console.log(responseData);
                    if (status === "OK") {
                        await AsyncStorage.setItem('token', token);
                        await SecureStore.setItemAsync('authState', '2');
                        const currentTime = format(new Date(),timeFormat);
                        await AsyncStorage.setItem('loggedinat', currentTime);

                        // setShowPopmessage(message);
                        // setShowSuccessAlertPopUp(true);
                        // setTimeout(() => {
                            // setShowSuccessAlertPopUp(false);
                            // setIsLoading(false);
                            navigation.replace("TabScreen");
                        // }, 3000);
                    }
                    else if(status === "INVALID"){
                        
                        setShowPopmessage(message);
                        setShowInvalidAlert(true);
                    }
                    else if(status === "DEVICE_MISMATCH"){
                        setShowPopmessage(message);
                        setDeviceMismatchAlert(true);
                        clearDatas();
                        
                        
                    }
                    else if(status === "INACTIVE"){
                        if (!message) {
                            message = "Something went wrong" 
                         }
                         setShowPopmessage(message);
                         setShowInvalidAlert(true);
                    }
                    else {
                        if (!message) {
                           message = "Something went wrong" 
                        }
                        setShowPopmessage(message);
                        setShowInvalidAlert(true);
                    }
                    // return response.json();
                } else {
                    setShowPopmessage("Something Went Wrong Try after some times")
                    setShowInvalidAlert(true);
                    setIsLoading(false);
                    // return data;
                }
            })
            .catch(error => {
                setIsLoading(false);
                // setLastErrorMessage(error.message);
                setShowPopmessage("Something Went Wrong Try after some times")
                setShowInvalidAlert(true);
            });
        });
    };    

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/ifm.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={{ height: 20 }}></View>
                    <View style={styles.centerText}>
                        <View style={styles.inputContainer}>
                            <SimpleLineIcons name="user" size={20} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='User Name'
                                autoCapitalize="none"
                                value={username}
                                // onChangeText={setUsername}
                                editable={false}
                                selectTextOnFocus={false}

                            />
                        </View>
                        <View style={{ height: 20 }}></View>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={24} color="#FF6E00" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Password'
                                secureTextEntry={true}
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>
                    <View style={[styles.circle, { backgroundColor: '#FF6E00' }]}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white"
                            onPress={handleLogin}
                        />
                    </View>
                    <CustomAlert
                        visible={showConnectAlert}
                        onClose={() => setShowConnectAlert(false)}
                        message="Connect to the internet"
                    />
                    <CustomAlert
                        visible={showFieldAlert}
                        onClose={() => setShowFieldAlert(false)}
                        message="Please provide password."
                    />
                    <SuccessAlert
                        visible={showSuccessAlert}
                        onClose={() => {
                                setShowSuccessAlert(false)
                                navigation.replace("TabScreen");
                            }
                        }
                        message={showPopmessage}
                    />
                    <CustomAlert
                        visible={showValidAlert}
                        onClose={() => setShowValidAlert(false)}
                        message="Please enter valid data"
                    />
                    <CustomAlert
                        visible={showValidAlert}
                        onClose={() => setShowValidAlert(false)}
                        message={lastErrorMessage}
                    />

                    <CustomAlert
                        visible={showInvalidAlert}
                        onClose={() => setShowInvalidAlert(false)}
                        message={showPopmessage}
                    />
                    <CustomAlert
                        visible={deviceMismatchAlert}
                        onClose={() => {

                                setDeviceMismatchAlert(false)
                                navigation.replace("SignUp")
                            }
                        }
                        message={showPopmessage}
                    />
                    <SuccessAlertPopup
                        visible={showSuccessAlertPopUp}
                        onClose={ () => {
                                // navigation.pop();
                                // setIsLoading(false)
                                setShowSuccessAlertPopUp(false)
                                // await navigation.replace("Login");
                                // changeNavigation();
                            }
                        }
                        message={showPopmessage}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    circle: {
        width: 70,
        height: 70,
        left:120,
        top:100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
});