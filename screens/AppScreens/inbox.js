import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Inbox = () => {
    const navigation = useNavigation();

    const handleItemClick = () => {
        navigation.navigate('InboxIndividual');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputContainer} onPress={handleItemClick}>
            <Text style={styles.baseText}>Email: {item.subject} - {item.message}</Text>
            <Text style={styles.innerText}>{item.date}</Text>
        </TouchableOpacity>
    );

    const data = [
        { id: '1', subject: 'Subject 1', message: 'Message 1', date: '16.04.23 12:24 PM' },
        { id: '2', subject: 'Subject 2', message: 'Message 2', date: '16.04.23 12:24 PM' },
        { id: '3', subject: 'Subject 3', message: 'Message 3', date: '16.04.23 12:24 PM' },
        { id: '4', subject: 'Subject 4', message: 'Message 4', date: '16.04.23 12:24 PM' },
        { id: '5', subject: 'Subject 5', message: 'Message 5', date: '16.04.23 12:24 PM' },
        { id: '6', subject: 'Subject 6', message: 'Message 6', date: '16.04.23 12:24 PM' },
        { id: '7', subject: 'Subject 7', message: 'Message 7', date: '16.04.23 12:24 PM' },
        { id: '8', subject: 'Subject 8', message: 'Message 8', date: '16.04.23 12:24 PM' },
        { id: '9', subject: 'Subject 9', message: 'Message 9', date: '16.04.23 12:24 PM' },
    ];

    return (
        <View style={styles.container}>
            <View style={{ height: 20 }}></View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search                                                                                      "
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
        textAlign: 'center'
    },
});

export default Inbox;