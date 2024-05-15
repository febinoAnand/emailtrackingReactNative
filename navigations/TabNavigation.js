import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inbox from '../screens/AppScreens/inbox';
import Report from '../screens/AppScreens/reports';
import Ticket from '../screens/AppScreens/tickets';
import Dashboard from '../screens/AppScreens/dashboard';
import Settings from '../screens/AppScreens/settings';


const BottomTab = createBottomTabNavigator();

export function TabGroup(){
    return(
        <BottomTab.Navigator screenOptions={{headerShown:false}}>
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