import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { App_Token, BaseURL } from '../../config/appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../AuthScreens/customalert.js';
import NetInfo from "@react-native-community/netinfo";

export default function Settings({ navigation }) {
    const [showValidAlert, setShowValidAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [deviceID, setDeviceID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    useEffect(() => {
        getIDs();
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const getIDs = async () => {
        setDeviceID(await SecureStore.getItemAsync("deviceID"));
        setName(await AsyncStorage.getItem('name') || '');
        setEmail(await AsyncStorage.getItem('emailID') || '');
        setDesignation(await AsyncStorage.getItem('designation') || '');
        setMobileNo(await AsyncStorage.getItem('mobileNo') || '');
    }

    const handleLogout = async () => {
        try {
            if (!isConnected) {
                setShowValidAlert(true);
                setAlertMessage('No internet connection');
                return;
            }
    
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                setShowValidAlert(true);
                setAlertMessage('Token not found in AsyncStorage');
                return;
            }
    
            console.log('Authorization:', `Token ${token}`);
            const url = `${BaseURL}Userauth/userlogout/`;
            console.log(`URL: ${url}`);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    device_id: deviceID,
                    app_token: App_Token,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error data:', errorData);
                setShowValidAlert(true);
                setAlertMessage(errorData.error || 'Failed to revoke token');
                return;
            }
    
            await SecureStore.setItemAsync('authState', '1');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('session_id');
            await AsyncStorage.removeItem('verificationID');
    
            navigation.replace("Login");
        } catch (error) {
            console.error('Logout error:', error);
            setShowValidAlert(true);
            setAlertMessage(error.message || 'Failed to logout');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Profile</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                    </View>
                    <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Designation</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Designation"
                            value={designation}
                            onChangeText={setDesignation}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Mobile No</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile No"
                            value={mobileNo}
                            onChangeText={setMobileNo}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Device</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Device Model</Text>
                        <TextInput
                            style={styles.input}
                            // value={deviceName}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>App Version</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2.1"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Last Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="30-04-2024  12:24 PM"
                        />
                    </View>
                </View>
            </View>
            {/* <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Change Password"
                    color="#FF6E00"
                />
            </View> */}
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Logout"
                    color="#FF6E00"
                    onPress={handleLogout}
                />
            </View>
            <CustomAlert
                visible={showValidAlert}
                onClose={() => setShowValidAlert(false)}
                message={alertMessage}
            />
            <View style={{ height: 40 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ghostwhite'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'ghostwhite'
    },
    topHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "space-between",
        width: '100%',
    },
    inputContainer: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        height:70
    },
    inputHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
    },
    head: {
        backgroundColor: '#FF6E00',
        width: '108.5%',
        bottom:12,
        padding: 10,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    buttonContainer1: {
        borderRadius: 25,
        width:180,
        left:110,
        overflow: "hidden",
        alignSelf: 'stretch',
        shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5.84,
            elevation: 5,
      },
    downloadButton: {
        height: 30,
        width: 200,
        fontSize: 40,
        left: 8,
        borderRadius: 200,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
    inputTitle: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
});