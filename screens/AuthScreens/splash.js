import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User_Expirytime } from '../../config/appconfig.js';
import { differenceInSeconds } from 'date-fns'
import { DeviceID, App_Token } from '../../config/appconfig.js';


export default function Splash({ route, navigation }) {
    const { authState } = route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        checkAuthState(authState);
    }, [authState]);

    const checkAuthState = async (authState) => {
        try {
            let nextScreen = 'SignUp';

            if (authState === '1') {
                nextScreen = 'Login';
            } else if (authState === '2') {
                
                const loggedTime = new Date(await AsyncStorage.getItem('loggedinat'));
                // console.log(loggedTime);
                const currentTime = new Date();
                // console.log(currentTime);

                const elapsedTimeInSeconds = differenceInSeconds(currentTime,loggedTime);
                // console.log(elapsedTimeInSeconds);
                
                if (elapsedTimeInSeconds < User_Expirytime) { 
                    nextScreen = 'TabScreen';
                } else {
                    nextScreen = 'Login';
                }
            }
            await AsyncStorage.setItem('deviceID', DeviceID);
            await AsyncStorage.setItem('appToken', App_Token);

            await SecureStore.setItemAsync('authState', authState);

            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }
            ).start(() => {
                setTimeout(() => {
                    navigation.navigate(nextScreen);
                }, 2000);
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