import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { BaseURL } from '../../config/appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CircleAvatar = ({ text }) => {
    let firstLetter = text.charAt(0).toUpperCase();
    if (!firstLetter.match(/[a-zA-Z]/)) {
        firstLetter = text.charAt(1);
    }
    return (
        <View style={styles.circleAvatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
    );
};

const Inbox = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [username, setUsername] = useState(null);
    const [isAuthValid, setIsAuthValid] = useState(false);
    const [authstate, setAuthstate] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('emailID');
                if (storedUsername !== null) {
                    setUsername(storedUsername);
                    const token = await AsyncStorage.getItem('token');
                    const storedAuthstate = await AsyncStorage.getItem('authstate');
                    if (token) {
                        setIsAuthValid(true);
                    } else {
                        setIsAuthValid(false);
                    }
                    setAuthstate(parseInt(storedAuthstate, 10));
                    if (storedUsername === 'demo@ifm.com') {
                        fetchDefaultData();
                    } else {
                        fetchData();
                    }
                } else {
                    console.log('No username found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (isAuthValid && authstate === 2 && username !== 'demo@ifm.com') {
                const id = setInterval(fetchData, 3000);
                setIntervalId(id);
                return () => clearInterval(id);
            } else {
                return () => clearInterval(intervalId);
            }
        }, [isAuthValid, authstate, username])
    );

    const fetchDefaultData = () => {
        const defaultData = [
            {
                id: '1',
                from_email: 'demo@ifm.com',
                subject: 'Default Subject 1',
                message: 'This is a default message 1.',
                date: '2024-07-01',
                time: '10:00'
            },
            {
                id: '2',
                from_email: 'demo@ifm.com',
                subject: 'Default Subject 2',
                message: 'This is a default message 2.',
                date: '2024-07-02',
                time: '11:00'
            }
        ];
        setData(defaultData);
    };

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            setIsAuthValid(false);
            return;
        }

        const state = await NetInfo.fetch();
        if (state.isConnected) {
            try {
                const response = await fetch(BaseURL + "emailtracking/inbox/", {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log("Error", "Failed to fetch data from server");
            }
        } else {
            console.log("No Internet Connection", "Please check your internet connection and try again.");
        }
    };

    const handleItemClick = (item) => {
        navigation.navigate('InboxIndividual', { item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputContainer} onPress={() => handleItemClick(item)}>
            <CircleAvatar text={item.from_email} />
            <View style={styles.textContent}>
                <Text style={styles.baseText}>{item.subject.length > 10 ? item.subject.substring(0, 10) + "..." : item.subject}</Text>
                <Text style={styles.messagetext}>{item.message.length > 15 ? item.message.substring(0, 15) + "..." : item.message}</Text>
                <Text style={styles.innerText}>{item.date}</Text>
                <Text style={styles.innerText}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item => (
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.from_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.to_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase())
    ));

    return (
        <View style={styles.container}>
            <View style={{ height: 20 }}></View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search                                                                               "
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={filteredData.slice(0).reverse()}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'ghostwhite'
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 20,
        top:15,
        padding: 6
    },
    circleAvatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#FF6E00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textContent: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
        marginBottom: 10,
    },
    innerText: {
        textAlign: 'center',
        left:80,
        bottom:40,
        fontSize:12
    },
    readStatus: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 10,
        bottom: 30
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        marginBottom: 20,
        borderColor: 'white',
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
    searchIcon: {
        position: 'absolute',
        left: 310,
        zIndex: 1,
    },
    input: {
        paddingLeft: 30,
    },
    messagetext:{
        color:'gray',
        fontSize:14,
        left:5,
        top:10
    }
});

export default Inbox;