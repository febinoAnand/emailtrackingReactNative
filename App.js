import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigations/Navigation"
import Inbox from './screens/AppScreens/inbox';
import { TabGroup } from './navigations/TabNavigation';
import Dashboard from './screens/AppScreens/dashboard';
export default function App() {
  return (
    <Navigation/>
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
