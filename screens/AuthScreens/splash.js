import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User_Expirytime } from '../../config/appconfig.js';
import { differenceInSeconds } from 'date-fns'
import { DeviceID, App_Token } from '../../config/appconfig.js';


export default function Splash({ route, navigation }) {
    // const { authState } = route.params;
    const [authState,setAuthState] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const authStateKey = "authState";
  

    const getAuthState = async (key) =>{
        let data = await SecureStore.getItemAsync(key);
        if(data==null || data =='' || data == 'null' || !data || typeof(data) != 'string' ){
            data = '0';
            await SecureStore.setItemAsync(key,data); 
        }
        console.log("splashauthState-->",data);
        checkAuthState(data);
        setAuthState(data);
    }

    useEffect(()=>{
        getAuthState(authStateKey);
    },[])

    const checkAuthState = async (authState) => {
        try {
            let nextScreen = 'SignUp';

             if (authState === '2') {
                const loggedTime = new Date(await AsyncStorage.getItem('loggedinat'));
                // console.log(loggedTime);
                const currentTime = new Date();
                // console.log(currentTime);

                const elapsedTimeInSeconds = differenceInSeconds(currentTime,loggedTime);
                // console.log(elapsedTimeInSeconds);
                
                //if session expired...
                if (elapsedTimeInSeconds > User_Expirytime) { 
                    nextScreen = 'Login';
                    setAuthState("1");
                await SecureStore.setItemAsync(authStateKey, "1");
                } 
                //if not expired...
                else {
                    nextScreen = 'TabScreen';
                }
            }
            // Login Needed...
            else if (authState === '1') {
                nextScreen = 'Login';
            } 
            else{
                setAuthState("0");
                await SecureStore.setItemAsync(authStateKey, "0");
            }
            await AsyncStorage.setItem('deviceID', DeviceID);
            await AsyncStorage.setItem('appToken', App_Token);

            

            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start(() => {
                setTimeout(() => {

                    navigation.replace(nextScreen);
                }, 1000);
            });
        } catch (error) {
            console.error('Error retrieving authentication state:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/ifm.png')}
                style={[styles.image, { opacity: fadeAnim }]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '50%',
        height: '50%',
    },
});