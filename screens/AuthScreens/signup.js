import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
                        <SimpleLineIcons name="user" size={20} color="#FF6E00" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email' />
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="call-sharp" size={20} color="#FF6E00" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Mobile No' />
                    </View>
                    <TouchableOpacity style={[styles.circle, { backgroundColor: '#FF6E00' }]} onPress={navigateToOTP}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
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