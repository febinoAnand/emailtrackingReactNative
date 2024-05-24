import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DatePicker from '@react-native-community/datetimepicker';
import { BaseURL } from '../../config/appconfig';
import { TouchableOpacity } from 'react-native';

export default function Checkscreen() {
    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.centerText}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Auth State'
                            />
                        </View>
                    </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Set"
                    color="#FF6E00"
                />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Move"
                    color="#FF6E00"
                />
            </View>
            <View style={{ height: 40 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ghostwhite'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'ghostwhite'
    },
    centerText: {
        alignItems: "center",
        justifyContent: "center",
    },
    topHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "space-between",
        width: '100%',
    },
    inputHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
    },
    head: {
        backgroundColor: '#FF6E00',
        width: '108.5%',
        bottom:12,
        padding: 10,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    buttonContainer1: {
        borderRadius: 25,
        width:180,
        left:110,
        overflow: "hidden",
        alignSelf: 'stretch',
        shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5.84,
            elevation: 5,
      },
    downloadButton: {
        height: 30,
        width: 200,
        fontSize: 40,
        left: 8,
        borderRadius: 200,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
    inputTitle: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '80%',
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
});