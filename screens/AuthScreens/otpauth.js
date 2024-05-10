import {View,Text,TextInput,Button,StyleSheet} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react';

export default function OTPAuth({navigation}){
    const inputRefs = [...Array(5)].map(() => useRef(null));

    const focusNextInput = (index) => {
        if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
        }
    };

    const focusPreviousInput = (index) => {
        if (index > 0) {
        inputRefs[index - 1].current.focus();
        }
    };

    const handleInputChange = (value, index) => {
        if (value !== '') {
        focusNextInput(index);
        } else {
        focusPreviousInput(index);
        }
    };
    return(
        <View style={style.container}>
        <View>
            <Text style={style.baseText}>OTP was sent to +91-9790928992</Text>
            <Text style={style.innerText}>Click here to change mobile no</Text>
        </View>
        <View style={style.otpContainer}>
        {[...Array(5)].map((_, index) => (
          <TextInput
            key={index} ref={inputRefs[index]}
            style={style.otpInput} maxLength={1} keyboardType="numeric"
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                focusPreviousInput(index);
              }
            }}
          />
        ))}
        </View>
        <View >
            <Text>Resend in 20 sec....</Text>
        </View>
        <View style={style.resendButton}>
            <Button
                title="Resend"
                onPress={() => {
                    alert("Resend..OK");
                }}
                color="orange"
            />
        </View>
        <View style={style.button}>
            <AntDesign name="rightcircle" size={35} color="orange"
                onPress={()=>{
                    navigation.navigate("Registration")
                }}
            />
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
    },
    baseText: {
        fontWeight: 'bold',
        fontSize:20,
      },
    innerText: {
        textAlign:'center'
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    resendContainer: {
        marginTop: 10,
        height: 100,
        width:150
    },
    resendButton: {
        height: 30,
        width: 150,
        fontSize: 40,
        borderRadius: 200,
        overflow: 'hidden',
    },
    otpInput: {
        borderWidth: 3,
        borderColor: 'orange',
        height: 50,
        width: 50,
        marginHorizontal: 2,
        borderRadius: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        left: 120
    }

})