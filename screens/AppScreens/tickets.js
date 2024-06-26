import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { BaseURL } from '../../config/appconfig';

export default function Ticket() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const state = await NetInfo.fetch();
            if (state.isConnected) {
                try {
                    const response = await fetch(BaseURL + "emailtracking/ticket/");
                    const result = await response.json();
                    setData(result);
                    setFilteredData(result);
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

    const handleItemPress = (item) => {
        navigation.navigate('TicketIndividual', { item, navigation });
    }; 

    const renderItem = ({ item }) => {
        const requiredJsonCount = item.required_json ? Object.keys(item.required_json).length : 0;
        return (
            <TouchableOpacity style={styles.inputContainer} onPress={() => handleItemPress(item)}>
                <View style={styles.circleAvatar}>
                    <Text style={styles.avatarText}>{requiredJsonCount}</Text>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.baseText}>{item.ticketname}</Text>
                    <Text style={styles.innerText}>{item.date}</Text>
                    <Text style={styles.innerText}>{item.time}</Text>
                </View>
                <View style={{ position: 'absolute', top: '50%', right: 10, backgroundColor: 'green', width: 10, height: 10, borderRadius: 5 }}></View>
            </TouchableOpacity>
        );
    };    

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = data.filter(item =>
            item.subject.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={{ height: 20 }} />
            {/* <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View> */}
            <FlatList
                data={filteredData.slice(0).reverse()}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'ghostwhite',
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 18,
        top:15,
        padding: 6
    },
    textContent: {
        flex: 1,
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
    },
    innerText: {
        textAlign: 'center',
        left:80,
        bottom:30,
        fontSize:12
    },
});