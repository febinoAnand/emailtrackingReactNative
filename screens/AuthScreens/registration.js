import { useEffect, useState } from 'react';
import {View,TextInput,Button,StyleSheet} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';
import {App_Token, BaseURL} from '../../config/appconfig';
import { v4 as uuidv4 } from 'uuid';
import { useRoute } from '@react-navigation/native';

export default function Registration({navigation}){

    const route = useRoute();
    const {params} = route;
    const [name,setName] = useState("");
    const [designation,setDesignation] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [deviceID,setDeviceID] = useState("");
    const [appToken,setAppToken] = useState("");
    const [sessionID,setSessionID] = useState("");
    const [notificationID, setNotificationID] = useState("");
    const [verificationID,setVerificationID] = useState("");


    // const [responseData, setResponseData] = useState("");
    const [networkConnected, setNetworkConneted] = useState({
        status:false,
        connection_type:""  //MOB or WIFI and NO for not connected
    });

    useEffect(()=>{

        setSessionID(params.responseData.session_id);

        setVerificationID(params.responseData.verification_id);

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
        setNotificationID(App_Token);
        
    }


    const getDeviceID = async () => {
        const asyncSecureKeyName = "solitary-ids";
        let fetchUUID = await SecureStore.getItemAsync(asyncSecureKeyName);
        fetchUUID = fetchUUID.replaceAll("\"", "");
        // console.log("Device-ID->",fetchUUID);
        setDeviceID(fetchUUID)
    }


    const validateInput = (stateAsInput) =>{
        
        
        if(stateAsInput.name == "" || stateAsInput.name == " " ){
            alert("Enter valid name")
            return false;
        }

        if(stateAsInput.password == "" || stateAsInput.password == " " ){
            alert("Enter valid Password")
            return false;
        }

        if(stateAsInput.confirmPassword == "" || stateAsInput.confirmPassword == " " ){
            alert("Enter valid Password")
            return false;
        }

        if(stateAsInput.confirmPassword != stateAsInput.password){
            alert("Password Mismatch")
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
        fetch(BaseURL+"app/userregister/",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json()).then(json => {
                console.log("Response-->",json);

                //if status ok vigate
                if(checkAndValidateResponse(json)){
                    // alert("Message Sent to ");
                    // navigation.navigate("OTP",{responseData:json,mobileNo:mobileNo,email:email,sessionID:sessionID});
                    navigation.navigate("Login");
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
        <View style={styles.centerText}>
            <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={text => setName(text)}/>
            <TextInput style={styles.textInput} placeholder="Designation" value={designation} onChangeText={text => setDesignation(text)}/>
            <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={text => setPassword(text)}/>
            <TextInput style={styles.textInput} placeholder="Confirm Password" value={confirmPassword} onChangeText={text => setConfirmPassword(text)}/>
            <View style={styles.button}>
                <Button title = "Submit"
                    onPress={()=>{
                        // navigation.navigate("Login")
                        if(!validateInput({name,designation,password,confirmPassword}))
                            return;

                        callAPI({appToken,deviceID,sessionID,password,designation,name,notificationID,verificationID})
                    }}
                />
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    centerText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        gap:10,
    },
    textInput:{
        borderWidth:1,
        borderColor:"black",
        height:40,
        width:250,
        margin:10,
        borderRadius:10,
        padding:5
    },
    button:{
        marginTop:20,
    }


})