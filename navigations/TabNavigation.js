import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Inbox from '../screens/AppScreens/inbox';
import Report from '../screens/AppScreens/reports';
import Ticket from '../screens/AppScreens/tickets';
import Dashboard from '../screens/AppScreens/dashboard';
import Settings from '../screens/AppScreens/settings';


const BottomTab = createBottomTabNavigator();

export function TabGroup(){
    return(
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Inbox') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Ticket') {
                        iconName = focused ? 'ticket' : 'ticket-outline';
                    } else if (route.name === 'Report') {
                        iconName = focused ? 'documents' : 'documents-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    const tabColor = focused ? 'orange' : color;

                    return <Icon name={iconName} size={size} color={tabColor} />;
                },
            })}
            >
            <BottomTab.Screen name='Dashboard' component={Dashboard}/>
            <BottomTab.Screen name='Inbox' component={Inbox}/>
            <BottomTab.Screen name='Ticket' component={Ticket}/>
            <BottomTab.Screen name='Report' component={Report}/>
            <BottomTab.Screen name='Settings' component={Settings}/>
        </BottomTab.Navigator>
    )
}


export default function TabNavigation(){
    return (
        <NavigationContainer>
            <TabGroup/>
        </NavigationContainer>
    )
}