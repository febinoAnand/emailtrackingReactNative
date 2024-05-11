import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Inbox() {
    const [searchText, setSearchText] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ height: 20 }}></View>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search                                                                                           "
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={styles.inputContainer}>
                <Text style={styles.baseText}>Email : Subject-Message</Text>
                <Text style={styles.innerText}>16.04.23  12:24 PM</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: 'ghostwhite'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    baseText: {
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
        alignItems: 'center',
        borderWidth: 2,
        borderColor:'white',
        backgroundColor: 'white',
        width: '100%',
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
    },
    searchIcon: {
        position: 'absolute',
        left: 330,
        zIndex: 1,
    },
    input: {
        paddingLeft: 10,
    },
    innerText: {
        textAlign: 'center'
    },
});