import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function Splash({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }
        ).start(() => {
            setTimeout(() => {
                navigation.navigate('SignUp');
            }, 2000);
        });
    }, []);

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