import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { BaseURL } from '../../config/appconfig';

const Inbox = () => {
    const [data, setData] = useState([]);
    // const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const handleItemClick = (item) => {
        navigation.navigate('InboxIndividual', { item, navigation });
    };        

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputContainer} onPress={() => handleItemClick(item)}>
            <Text style={styles.baseText}> {item.from_email}  {item.subject }</Text>
            <Text style={styles.innerText}>{item.date}  {item.time}</Text>
            {/* <Text style={styles.readStatus}>{item.read ? 'read' : 'Unread'}</Text> */}
        </TouchableOpacity>
    );

    useEffect(() => {
        const fetchData = async () => {
            const state = await NetInfo.fetch();
            if (state.isConnected) {
                try {
                    const response = await fetch(BaseURL+ "emailtracking/inbox/");
                    const result = await response.json();
                    setData(result);
                } catch (error) {
                    Alert.alert("Error", "Failed to fetch data from server");
                }
            } else {
                Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            }
        };

        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ height: 20 }}></View>
            {/* <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View> */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'ghostwhite'
    },
    baseText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        padding:6
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginBottom: 20,
        borderColor:'white',
        borderRadius: 200,
        borderWidth: 2,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        height: 80,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    searchIcon: {
        position: 'absolute',
        left: 310,
        zIndex: 1,
    },
    input: {
        paddingLeft: 30,
        width: '90%'
    },
    innerText: {
        textAlign: 'center'
    },
    readStatus: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 10,
        bottom:30
    }
});

export default Inbox;