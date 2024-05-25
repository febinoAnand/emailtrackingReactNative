import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from '@expo/vector-icons';
import LoadingScreen from './loadingscreen';
import CustomAlert from './customalert';
import { BaseURL } from '../../config/appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPpage({ navigation, route }) {
  const { otp_resend_interval, mobileNo } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [showResendAlert, setShowResendAlert] = useState(false);
  const inputRefs = [...Array(5)].map(() => useRef(null));
  const [showConnectAlert, setShowConnectAlert] = useState(false);
  const [showOtpAlert, setShowOtpAlert] = useState(false);
  const [showresAlert, setShowresAlert] = useState(false);
  const [resendInterval, setResendInterval] = useState(null);
  const [OTP, setEnteredOTP] = useState('');
  const countdownRef = useRef(null);

  useEffect(() => {
    checkInternetConnection();
  }, []);

  useEffect(() => {
    let interval = null;
    if (showResendAlert) {
      interval = setInterval(() => {
        setResendInterval(prevInterval => prevInterval - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showResendAlert]);

  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setShowConnectAlert(true);
      return false;
    }
    return true;
  };

  const compareOTPWithServer = async () => {
    if (OTP.length === 5) {
      setIsLoading(true);
      const isConnected = await checkInternetConnection();
      if (isConnected) {
        try {
          const deviceID = await AsyncStorage.getItem('deviceID');
          const appToken = await AsyncStorage.getItem('appToken');
          const session_id = await AsyncStorage.getItem('sessionID');

          const response = await fetch(BaseURL + "app/userverify/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              OTP: OTP,
              sessionID: session_id,
              appToken: appToken,
              deviceID: deviceID,
            }),
          });
          // console.log(OTP)
          // console.log(session_id)
          // console.log(appToken)
          // console.log(deviceID)

          if (response.ok) {
            const responseData = await response.json();
            if (responseData.verification_id) {
              setIsLoading(false);
              AsyncStorage.setItem('verificationID', responseData.verification_id);
              // console.log(responseData.verification_id);
              navigation.navigate('Registration');
            } else {
              setIsLoading(false);
              setShowresAlert(true);
            }
          } else {
            setIsLoading(false);
            setShowOtpAlert(true);
          }
        } catch (error) {
          console.error('Error:', error);
          setIsLoading(false);
          setShowOtpAlert(true);
        }
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (value, index) => {
    if (value !== '') {
      setEnteredOTP(prevOTP => prevOTP + value);
      focusNextInput(index);
    } else {
      setEnteredOTP(prevOTP => prevOTP.slice(0, -1));
      focusPreviousInput(index);
    }
  };

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

  const showAlertForResend = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setShowResendAlert(true);
      let interval = otp_resend_interval;
      setResendInterval(interval);
      const session_id = await AsyncStorage.getItem('sessionID');
      const deviceID = await AsyncStorage.getItem('deviceID');
      const appToken = await AsyncStorage.getItem('appToken');
  
      const requestBody = {
        sessionID: session_id,
        deviceID: deviceID,
        appToken: appToken,
      };
  
      fetch(BaseURL + "app/resendotp/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to resend OTP');
          }
        })
        .catch(error => {
          console.error('Error resending OTP:', error);
        });
  
      const countdown = setInterval(() => {
        interval--;
        setResendInterval(interval);
        if (interval === 0) {
          clearInterval(countdown);
          setShowResendAlert(false);
          setResendInterval(null);
        }
      }, 1000);
      if (countdownRef.current) clearInterval(countdownRef.current);
        countdownRef.current = countdown;
    }
  };  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.baseText}>OTP was sent to +91-{mobileNo}</Text>
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
            {resendInterval !== null && (
              <Text>Resend in {resendInterval} sec....</Text>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Resend" color="#FF6E00" onPress={showAlertForResend} />
            </View>
          </View>
          <View style={[styles.circle, { backgroundColor: '#FF6E00', left: 100 }]}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              color="white"
              onPress={compareOTPWithServer}
            />
          </View>
        </>
      )}
      <CustomAlert
        visible={showResendAlert}
        onClose={() => setShowResendAlert(false)}
        message="RESEND"
      />
      <CustomAlert
        visible={showConnectAlert}
        onClose={() => setShowConnectAlert(false)}
        message="Connect to the internet or exit the app"
      />
      <CustomAlert
        visible={showOtpAlert}
        onClose={() => setShowOtpAlert(false)}
        message="Entered OTP is incorrect. Please try again."
      />
      <CustomAlert
        visible={showresAlert}
        onClose={() => setShowresAlert(false)}
        message="Something went wrong !"
      />
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
    width: 200,
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
    borderColor: '#FF6E00',
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