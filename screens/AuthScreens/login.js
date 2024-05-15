import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';

export default function Login({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

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
                    <View style={styles.centerText}>
                        <View style={styles.inputContainer}>
                            <SimpleLineIcons name="user" size={20} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='User Name' />
                        </View>
                        <View style={{ height: 20 }}></View>
                        <View style={styles.inputContainer}>
                            <Feather name="lock" size={24} color="darkorange" style={styles.icon} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Password' />
                        </View>
                    </View>
                    <View style={[styles.circle, { backgroundColor: 'darkorange' }]}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="white"
                            onPress={() => {
                                setIsLoading(true);
                                setTimeout(() => {
                                    setIsLoading(false);
                                    navigation.navigate("TabScreen");
                                }, 2000);
                            }}
                        />
                    </View>
                </View>
            )}
        </>
    )
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