import { useEffect, useState } from 'react';
import {Text,View,TextInput, StyleSheet,Button} from 'react-native';
import ValidationTextInput from '../../components/ValidationTextinput';
import {App_Token, BaseURL} from '../../config/appconfig';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import NetInfo from '@react-native-community/netinfo';




export default function Signup({navigation}){

    const [email,setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [deviceID,setDeviceID] = useState("");
    const [appToken,setAppToken] = useState("");
    const [responseData, setResponseData] = useState("");
    const [networkConnected, setNetworkConneted] = useState({
        status:false,
        connection_type:""  //MOB or WIFI and NO for not connected
    });
    const [requestData,setRequestData] = useState({
        app_token : "",
        device_id : "",
        mobile_no : "",
        email_id : ""
    })
    
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
        fetchUUID = fetchUUID.replaceAll("\"", "");
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
                // console.log("Response-->",json);
                // checkstatus
                //if status ok vigate
                if(checkAndValidateResponse(json)){
                
                    // navigation.navigate("OTP");
                    alert("Successfull");
                }
                // else show error
                else{

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
        <View style={styles.centerText} >
            
            <View style={styles.rowContainer}>
                <ValidationTextInput
                    placeholder="Email"
                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    validationMessage = "Enter Valid Email"
                    inputMode="email"
                    value={email}
                    onChangeState={setEmail}
                />
            </View>
            <View style={styles.rowContainer}>

                <TextInput
                    value={"+91"}
                    
                />
                <ValidationTextInput
                    placeholder="Mobile"
                    regex={/^\d{10}$/}
                    validationMessage = "Enter Mobile No"
                    inputMode="numeric"
                    value={mobileNo}
                    onChangeState={number => setMobileNo(number)}
                />
            </View>
            <View style={styles.button}>
                <Button title="submit" onPress = {()=>{
                    // navigation.navigate("OTP");
                    if(!validateInput({email,mobileNo}))
                        return;
                    let mobileno = "+91"+mobileNo;
                    callAPI({email,mobileno,deviceID,appToken});
                }}/>
            </View>
        </View>
    )
}



const styles= StyleSheet.create({
    centerText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
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
    },
    rowContainer:{
        flexDirection:"row",
        alignContent:"space-around",
        justifyContent:"flex-end"
    }
})

