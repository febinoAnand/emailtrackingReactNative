import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';

export default function OTPAuth({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = [...Array(5)].map(() => useRef(null));

  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleInputChange = (value, index) => {
    if (value !== '') {
      focusNextInput(index);
    } else {
      focusPreviousInput(index);
    }
  };

  const navigateToRegistration = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Registration');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.baseText}>OTP was sent to +91-9790928992</Text>
            <Text style={styles.innerText}>Click here to change mobile no</Text>
          </View>
          <View style={styles.otpContainer}>
            {[...Array(5)].map((_, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    focusPreviousInput(index);
                  }
                }}
              />
            ))}
          </View>
          <View style={styles.resendContainer}>
            <Text>Resend in 20 sec....</Text>
            <View style={styles.buttonContainer}>
              <Button title="Resend" color="darkorange" onPress={() => alert("Resend..OK")} />
            </View>
          </View>
          <View style={[styles.circle, { backgroundColor: 'darkorange', left: 100 }]}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              color="white"
              onPress={navigateToRegistration}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  innerText: {
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  resendContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 25,
    width:200,
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
  otpInput: {
    borderWidth: 3,
    borderColor: 'darkorange',
    height: 50,
    width: 50,
    marginHorizontal: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.84,
    elevation: 8,
  },
});