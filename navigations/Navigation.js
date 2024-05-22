import {NavigationContainer} from '@react-navigation/native';

import {View,Text} from 'react-native';



import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/AuthScreens/splash';
import Signup from '../screens/AuthScreens/signup';
import Login from '../screens/AuthScreens/login';
import OTPAuth from '../screens/AuthScreens/otpauth';
import Registration from '../screens/AuthScreens/registration';
import AuthScreenHome from '../screens/AuthScreens/authHome';
import Splash from '../screens/AuthScreens/splash';
import { TabGroup } from './TabNavigation';
const Stack = createNativeStackNavigator();




export default function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name='Splash' component={Splash} options={{title: 'Auth Screen'}}/> */}
                {/* <Stack.Screen name='AuthHomeScreen' component={AuthScreenHome} options={{title: 'Auth Screen'}}/> */}
                <Stack.Screen name='SignUp' component={Signup} options={{headerShown: false,}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false,}}/>
                <Stack.Screen name='OTP' component={OTPAuth} options={{headerShown: false,}}/>
                <Stack.Screen name='Registration' component={Registration} options={{headerShown: false,}}/>
                <Stack.Screen name='TabScreen' component={TabGroup} options={{headerShown: false,}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}