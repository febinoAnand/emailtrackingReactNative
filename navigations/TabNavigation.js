import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Inbox from '../screens/AppScreens/inbox';
import InboxIndividual from '../screens/AppScreens/individualInbox';
import Report from '../screens/AppScreens/reports';
import Ticket from '../screens/AppScreens/tickets';
import TicketIndividual from '../screens/AppScreens/ticketindividual';
import Dashboard from '../screens/AppScreens/dashboard';
import Settings from '../screens/AppScreens/settings';
import { BaseURL } from '../config/appconfig';

const BottomTab = createBottomTabNavigator();
const InboxStack = createStackNavigator();
const TicketStack = createStackNavigator();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
      <InboxStack.Screen name="InboxIndividual" component={InboxIndividual} options={{ headerShown: false }} />
    </InboxStack.Navigator>
  );
}

function TicketStackScreen() {
  return (
    <TicketStack.Navigator>
      <TicketStack.Screen name="Ticket" component={Ticket} options={{ headerShown: false }} />
      <TicketStack.Screen name="TicketIndividual" component={TicketIndividual} options={{ headerShown: false }} />
    </TicketStack.Navigator>
  );
}

export function TabGroup() {
  const [inboxData, setInboxData] = useState([]);
  const [ticketData, setticketData] = useState([]);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    const getTokenAndUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUsername = await AsyncStorage.getItem('emailID');
        if (storedToken !== null) {
          setToken(storedToken);
        }

        if (storedUsername === 'demo@ifm.com') {
          setIsDemoUser(true);
        } else {
          setIsDemoUser(false);
        }
        setUsername(storedUsername || '');
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    getTokenAndUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const inboxResponse = await fetch(BaseURL + "emailtracking/inbox/", {
            headers: {
              Authorization: `Token ${token}`
            }
          });
          const inboxData = await inboxResponse.json();
          setInboxData(inboxData);

          const ticketResponse = await fetch(BaseURL + "emailtracking/ticket/", {
            headers: {
              Authorization: `Token ${token}`
            }
          });
          const ticketData = await ticketResponse.json();
          setticketData(ticketData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [token]);

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
        activeTintColor: '#FF6E00',
        labelStyle: {
          activeTintColor: '#FF6E00',
        },
      }}
    >
      <BottomTab.Screen name='Dashboard' component={Dashboard} />
      <BottomTab.Screen 
        name='Inbox' 
        component={InboxStackScreen} 
        options={{
          tabBarBadge: isDemoUser ? 2 : (inboxData.length > 0 ? inboxData.length : null),
        }} 
      />
      <BottomTab.Screen 
        name='Ticket' 
        component={TicketStackScreen} 
        options={{
          tabBarBadge: isDemoUser ? 2 : (ticketData.length > 0 ? ticketData.length : null),
        }} 
      />
      <BottomTab.Screen name='Report' component={Report} />
      <BottomTab.Screen name='Settings' component={Settings} />
    </BottomTab.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}