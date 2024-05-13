import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Ticket() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const data = [
        { id: '1', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '2', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '3', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '4', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '5', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '6', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '7', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '8', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
        { id: '9', subject: 'Static threshold - 24-03-15-062104-xLLo', date: '16.04.23 12:24 PM' },
    ];

    const handleItemPress = (item) => {
        navigation.navigate('TicketIndividual', { item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.baseText}>{item.subject}</Text>
            <Text style={styles.innerText}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ height: 20 }}></View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
        marginBottom: 10,
    },
    searchIcon: {
        position: 'absolute',
        left: 330,
        zIndex: 1,
    },
    input: {
        paddingLeft: 30,
    },
    innerText: {
        textAlign: 'center'
    },
});