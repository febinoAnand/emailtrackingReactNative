import { useEffect, useState } from 'react';
import {View,Text,TextInput,Button,StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {App_Token, BaseURL} from '../../config/appconfig';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';


export default function OTPAuth({navigation}){

    const route = useRoute();
    const {params} = route;
    const [OTP,setOTP] = useState("");
    const [sessionID, setSessionID] = useState("");
    const [deviceID,setDeviceID] = useState("");
    const [appToken,setAppToken] = useState("");
    const [responseData, setResponseData] = useState("");
    const [networkConnected, setNetworkConneted] = useState({
        status:false,
        connection_type:""  //MOB or WIFI and NO for not connected
    });



    useEffect(()=>{

        // console.log("resonse on otp page->",params.responseData);
        setSessionID(params.responseData.session_id)

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
        fetchUUID = fetchUUID.replaceAll("\"", "");
        // console.log("Device-ID->",fetchUUID);
        setDeviceID(fetchUUID)
    }

    
    const checkAndValidateResponse = (data) => {
        console.log("data-->",data);
        if(data.status === "OK"){
            return true;
        }
        return false;
    }

    const validateInput = (stateAsInput) =>{
        console.log("OTP-->",stateAsInput.OTP)
        const OTPRegex = /^\d{5}$/;
        const isOTPValid = OTPRegex.test(stateAsInput.OTP);
        if(!isOTPValid){
            alert("Entered OTP not valid");
            return false;
        }  
        return true;
    }

    const callAPI = (data) =>{
        console.log("Request-data->",data);
        fetch(BaseURL+"app/userverify/",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json()).then(json => {
                console.log("Response-->",json);
                // console.log("sessionID->",params.sessionID);
                // setSessionID(params.sessionID);
                // checkstatus

                //if status ok vigate
                if(checkAndValidateResponse(json)){
                    // alert("Message Sent to ");
                    // navigation.navigate("OTP",{responseData:json,mobileNo:mobileNo,email:email});
                    
                    navigation.navigate("Registration",{responseData:json});
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
        <View style={style.container}>
        <View>
        <Text>OTP was sent to </Text>
            <Text>Click here to change mobile no +91-{params.mobileNo}</Text>
            
        </View>
        <View >
            <TextInput style={style.textInput} keyboardType='numeric' value={OTP} onChangeText={otpText=>setOTP(otpText)}/>
            <Text>Resend in 20 sec....</Text>
        </View>
        <View style={style.buttonContainer}>
            <View >
                <Button title="Resend" 
                    onPress={()=>{
                        alert("Resend..OK");
                    }}
                />
            </View>
            <View>
                <Button title="Submit"
                    onPress={()=>{
                        if(!validateInput({OTP}))
                            return;
                        // setSessionID(params.sessionID);
                        callAPI({deviceID,appToken,sessionID,OTP})
                    }}

                    
                />
            </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around",
        padding : 20
    },textInput:{
        borderWidth:1,
        borderColor:"black",
        height:40,
        width:250,
        margin:10,
        borderRadius:10,
        padding:5
    },buttonContainer:{
        flexDirection:"row",
        gap:20
    }

})