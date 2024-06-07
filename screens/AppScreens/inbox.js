import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { BaseURL } from '../../config/appconfig';

const CircleAvatar = ({ text }) => {
    let firstLetter = text.charAt(0).toUpperCase()
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
    const navigation = useNavigation();

    const handleItemClick = (item) => {
        navigation.navigate('InboxIndividual', { item, navigation });
    };        

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputContainer} onPress={() => handleItemClick(item)}>
            <CircleAvatar text={item.from_email} />
            <View style={styles.textContent}>
            <Text style={styles.baseText}>{item.subject.length > 20 ? item.subject.substring(0, 20) + "..." : item.subject}</Text>
            <Text style={styles.messagetext}>{item.message.length > 40 ? item.message.substring(0, 40) + "..." : item.message}</Text>
                <Text style={styles.innerText}>{item.date}</Text>
                <Text style={styles.innerText}>{item.time}</Text>
            </View>
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
    }, []);

    const filteredData = data.filter(item => {
        return item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.from_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.to_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.message.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
}

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