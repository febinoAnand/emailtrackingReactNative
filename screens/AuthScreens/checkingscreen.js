import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { timeFormat } from '../../config/appconfig';

export default function Checkscreen({ navigation }) {
    const [authState, setAuthState] = useState('');
    const [seedValue, setSeedValue] = useState('');
    const [loggedTime, setLoggedTime] = useState('');

    const handleSetAuthState = () => {
        setSeedValue(authState);
    };

    const handleSwitchToSplash = () => {
        navigation.navigate('Splash', { authState });
    };

    const handleSetTime = async () => {
        const currentTime = format(new Date(),timeFormat);
        await AsyncStorage.setItem('loggedinat', currentTime);
        setLoggedTime(currentTime);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.centerText}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Auth State'
                        value={authState}
                        onChangeText={text => setAuthState(text)}
                    />
                </View>
                <Text style={styles.seedText}>Value: {seedValue}</Text>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Set"
                    color="#FF6E00"
                    onPress={handleSetAuthState}
                />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Switch"
                    color="#FF6E00"
                    onPress={handleSwitchToSplash}
                />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Set Time"
                    color="#FF6E00"
                    onPress={handleSetTime}
                />
            </View>
            <View style={{ height: 40 }}></View>
            <Text>Time: {loggedTime}</Text>
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
    centerText: {
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textInput: {
        height: 40,
    },
    buttonContainer1: {
        borderRadius: 25,
        width: 180,
        overflow: "hidden",
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 5,
    },
});