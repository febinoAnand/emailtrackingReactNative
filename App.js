import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigations/Navigation"
import Inbox from './screens/AppScreens/inbox';
import { TabGroup } from './navigations/TabNavigation';
import Dashboard from './screens/AppScreens/dashboard';
import NotificationRegisterTest from './screens/TestScreens/notificationregistertest';
import NavigationwithPOPUP from './screens/TestScreens/navigationtestwitpopup';
export default function App() {
  return (
    <Navigation/>
    // <NavigationwithPOPUP/>
    // <NotificationRegisterTest/>
    // <TabGroup/>
    // <Dashboard/>
      
    // <Inbox/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
