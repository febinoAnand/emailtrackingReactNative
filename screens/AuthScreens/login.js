import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';
import NetInfo from "@react-native-community/netinfo";
import CustomAlert from './customalert';
import SuccessAlert from './successalert';
import { BaseURL } from '../../config/appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showConnectAlert, setShowConnectAlert] = useState(false);
    const [showFieldAlert, setShowFieldAlert] = useState(false);
    const [showPopmessage, setShowPopmessage] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showValidAlert, setShowValidAlert] = useState(false);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setShowConnectAlert(!state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

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
            fetch(BaseURL + "app/userauthtoken/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            .then(async response => {
                setIsLoading(false);
                if (!response.ok) {
                    const responseData = await response.json();
                    const { status, message } = responseData;
                    console.log(responseData);
                    if (status === "OK") {
                        if (message) {
                            setShowPopmessage(message);
                        }
                        throw new Error('Login failed. Please try again.');
                    } else {
                        if (message) {
                            setShowPopmessage(message);
                        }
                    }
                    return response.json();
                } else {
                    const data = await response.json();
                    await AsyncStorage.setItem('token', data.token);
                    console.log(data.token)
                    navigation.navigate("TabScreen");
                    return data;
                }
            })
            .catch(error => {
                setIsLoading(false);
                setLastErrorMessage(error.message);
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
                                onChangeText={setUsername}
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
                        message="Connect to the internet or exit the app"
                    />
                    <CustomAlert
                        visible={showFieldAlert}
                        onClose={() => setShowFieldAlert(false)}
                        message="Please provide both username and password."
                    />
                    <SuccessAlert
                        visible={showSuccessAlert}
                        onClose={() => setShowSuccessAlert(false)}
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