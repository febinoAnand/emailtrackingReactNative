import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Inbox from '../screens/AppScreens/inbox';
import InboxIndividual from '../screens/AppScreens/individualInbox';
import Report from '../screens/AppScreens/reports';
import Ticket from '../screens/AppScreens/tickets';
import TicketIndividual from '../screens/AppScreens/ticketindividual';
import Dashboard from '../screens/AppScreens/dashboard';
import Settings from '../screens/AppScreens/settings';

const BottomTab = createBottomTabNavigator();
const InboxStack = createStackNavigator();
const TicketStack = createStackNavigator();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InboxStack.Screen name="Inbox" component={Inbox} />
      <InboxStack.Screen name="InboxIndividual" component={InboxIndividual} />
    </InboxStack.Navigator>
  );
}

function TicketStackScreen() {
  return (
    <TicketStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TicketStack.Screen name="Ticket" component={Ticket} />
      <TicketStack.Screen name="TicketIndividual" component={TicketIndividual} />
    </TicketStack.Navigator>
  );
}

export function TabGroup() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Inbox') {
            iconName = 'list';
          } else if (route.name === 'Ticket') {
            iconName = 'ticket';
          } else if (route.name === 'Report') {
            iconName = 'documents';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'orange',
        labelStyle: {
          activeTintColor: 'orange',
        },
      }}
    >
      <BottomTab.Screen name='Dashboard' component={Dashboard} />
      <BottomTab.Screen name='Inbox' component={InboxStackScreen} />
      <BottomTab.Screen name='Ticket' component={TicketStackScreen} />
      <BottomTab.Screen name='Report' component={Report} />
      <BottomTab.Screen name='Settings' component={Settings} />
    </BottomTab.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <TabGroup  />
    </NavigationContainer>
  );
}