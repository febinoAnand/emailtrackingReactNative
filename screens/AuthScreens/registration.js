import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { SimpleLineIcons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';

export default function Registration({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Image
                        source={require('../../assets/ifm.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.centerText}>
                        <View style={styles.inputContainer}>
                            <SimpleLineIcons name="user" size={20} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Name' />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name="user-graduate" size={20} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Designation' />
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="unlock" size={20} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Password' />
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="unlock" size={20} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Confirm Password' />
                        </View>
                    </View>
                    <View style={[styles.circle, { backgroundColor: 'darkorange' }]}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white"
                            onPress={() => {
                                setIsLoading(true);
                                setTimeout(() => {
                                    setIsLoading(false);
                                    navigation.navigate("Login");
                                }, 2000);
                            }} />
                    </View>
                </ScrollView>
            )}
        </>
    )
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
        gap: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'darkorange',
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
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
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
})