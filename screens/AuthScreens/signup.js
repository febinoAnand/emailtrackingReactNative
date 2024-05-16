import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import ValidationTextInput from '../../components/ValidationTextinput';
import {App_Token, BaseURL} from '../../config/appconfig';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import NetInfo from '@react-native-community/netinfo';
import { SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen'; 



export default function Signup({navigation}){

    const [email,setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [deviceID,setDeviceID] = useState("");
    const [appToken,setAppToken] = useState("");
    const [sessionID,setSessionID] = useState("");
    // const [responseData, setResponseData] = useState("");
    const [networkConnected, setNetworkConneted] = useState({
        status:false,
        connection_type:""  //MOB or WIFI and NO for not connected
    });
    const [requestData,setRequestData] = useState({
        app_token : "",
       // device_id : "",
        mobile_no : "",
        email_id : ""
    })
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{

        // getting Network info 
        checkNetworkStatus();

        //initialize App Token
        initializeAppToken();

        // getting unique device ID
        getDeviceID();

        
    },[]);

    const checkNetworkStatus = () => {
        NetInfo.fetch().then(state => {
            // console.log('Connection type', state.type);
            // console.log('Is connected?', state.isConnected);
            let type = "NO";
            if (state.type === "cellular"){
                type = "MOB"
            }else if(state.isConnected === "wifi"){
                type = "WIFI"
            }
            setNetworkConneted(
                {
                    status:state.isConnected,
                    connection_type: type
                }
            )
        });
    }

    const initializeAppToken = () =>{
        setAppToken(App_Token);
    }


    const getDeviceID = async () => {
        const asyncSecureKeyName = "solitary-ids";
        let fetchUUID = await SecureStore.getItemAsync(asyncSecureKeyName);
        fetchUUID = fetchUUID ? fetchUUID.replaceAll("\"", "") : "d83dfb60-a6fc-4e5b-8db5-0db2b722d161";
        if (fetchUUID == null || !fetchUUID) {
            let uuid = uuidv4();
            await SecureStore.setItemAsync(asyncSecureKeyName, JSON.stringify(uuid));
            fetchUUID = uuid;
        }
        console.log("Device-ID->",fetchUUID);
        setDeviceID(fetchUUID)
    }


    const validateInput = (stateAsInput) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;
        const isEmailValid = emailRegex.test(stateAsInput.email);
        // console.log("Validation(",stateAsInput.email,")->",isEmailValid);
        const isMobileValid = mobileRegex.test(stateAsInput.mobileNo);
        // console.log("Validation(",stateAsInput.mobileNo,")->",isMobileValid);
        if(!isEmailValid ){
            alert("Email ID is not valid");
            return false;
        }
        if(!isMobileValid){
            alert("Mobile no not valid");
            return false;
        }  
        return true;
    }

    const checkAndValidateResponse = (data) => {
        console.log("data-->",data);
        if(data.status === "OK"){
            return true;
        }
        return false;
    }


    const callAPI = (data) =>{
        console.log("Request-data->",data);
        fetch(BaseURL+"app/userauth/",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json()).then(json => {
                console.log("Response-->",json);
                // setSessionID(json["session_id"]);
                // checkstatus
                //if status ok vigate
                if(checkAndValidateResponse(json)){
                    // alert("Message Sent to ");
                    
                    navigation.navigate("OTP",{responseData:json,mobileNo:mobileNo,email:email,sessionID:sessionID});
                }
                // else show error
                else if(json["message"])
                {
                    alert(json["message"]);
                }
                else{
                    alert("Network Issue")
                }
            }
        ).catch(error =>{
            if (error instanceof TypeError) {
                alert("Error in Connecting Network");
              } else {
                console.log("Error->",error);
              }
            
        })
    }
    

    return(
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
                <SimpleLineIcons name="user" size={20} color="darkorange" style={styles.icon} />
                <ValidationTextInput
                    style={styles.textInput}
                    placeholder="Email                                                                                  "
                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    validationMessage = "Enter Valid Email"
                    inputMode="email"
                    value={email}
                    onChangeState={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="call-sharp" size={20} color="darkorange" style={styles.icon} />


                <ValidationTextInput
                    style={styles.textInput}
                    placeholder="Mobile                                                                             "
                    regex={/^\d{10}$/}
                    validationMessage = "Enter Mobile No"
                    inputMode="numeric"
                    value={mobileNo}
                    onChangeState={number => setMobileNo(number)}
                />
            </View>
            <TouchableOpacity style={[styles.circle, { backgroundColor: 'darkorange' }]}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white"  onPress = {()=>{
                    // navigation.navigate("OTP");
                    if(!validateInput({email,mobileNo}))
                        return;
                    let mobileno = "+91"+mobileNo;
                    callAPI({email,mobileno,deviceID,appToken});
                }}/>
            </TouchableOpacity>
            </View>
            )}
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
        borderBottomColor: 'darkorange',
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
});