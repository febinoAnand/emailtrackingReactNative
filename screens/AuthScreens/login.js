import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../config/appconfig';

export default function Login({ navigation }) {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const state = await NetInfo.fetch();
            if (state.isConnected) {
                const response = await fetch(BaseURL + "app/userauthtoken/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Authentication failed');
                }
                const data = await response.json();
                const authToken = data.token;
                await AsyncStorage.setItem('authToken', authToken);
                navigation.navigate('TabScreen');
            } else {
                Alert.alert('No internet connection');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Login failed');
        }
    };    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="User Name"
                onChangeText={text => setUsername(text)}
                value={name}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <View style={styles.button}>
                <Button title="Submit" onPress={handleLogin} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        height: 40,
        width: 250,
        margin: 10,
        borderRadius: 10,
        padding: 5
    },
    button: {
        marginTop: 20,
    }
});