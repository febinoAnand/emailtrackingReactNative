import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen'; 

export default function Signup({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    const navigateToOTP = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("OTP");
        }, 2000);
    };

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <View style={styles.centerText}>
                    <Image
                        source={require('../../assets/ifm.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputContainer}>
                        <SimpleLineIcons name="user" size={20} color="orange" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email' />
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="call-sharp" size={20} color="orange" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Mobile No' />
                    </View>
                    <TouchableOpacity style={[styles.circle, { backgroundColor: 'orange' }]} onPress={navigateToOTP}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: "orange",
        height: 45,
        width: 300,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 40,
    },
    icon: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    button: {
        marginTop: 200,
        left: 130
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        left: 130,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
});