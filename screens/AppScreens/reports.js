import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DatePicker from '@react-native-community/datetimepicker';

export default function Reports() {
    const [searchText, setSearchText] = useState('');
    const tableHead = ['S.No', 'Date', 'Param 1', 'Param 2', 'Param 3'];
    const defaultFromDate = new Date();
    const defaultToDate = new Date();
    const [fromDate, setFromDate] = useState(defaultFromDate);
    const [toDate, setToDate] = useState(defaultToDate);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const showFromDate = () => {
        setShowFromDatePicker(true);
    };

    const showToDate = () => {
        setShowToDatePicker(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search                                                                                   "
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                </View>
                <View style={{ height: 20 }}></View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader1}>From Date</Text>
                        <View style={styles.buttonContainer2}>
                            <Button title={fromDate ? fromDate.toDateString() : 'Select Date'} onPress={showFromDate} color="orange" />
                        </View>
                        {showFromDatePicker && (
                            <DatePicker
                                value={fromDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || fromDate;
                                    setShowFromDatePicker(false);
                                    setFromDate(currentDate);
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader2}>To Date</Text>
                        <View style={styles.buttonContainer1}>
                            <Button title={toDate ? toDate.toDateString() : 'Select Date'} onPress={showToDate} color="orange" />
                        </View>
                        {showToDatePicker && (
                            <DatePicker
                                value={toDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || toDate;
                                    setShowToDatePicker(false);
                                    setToDate(currentDate);
                                }}
                            />
                        )}
                    </View>
                </View>
                <View style={{ height: 20 }}></View>
                <View style={styles.tableContainer}>
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                        <Row data={['1', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['2', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['3', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['4', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['5', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['6', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['7', '2024-05-01', '239', 'Low', 'High']} style={styles.row} textStyle={styles.rowText} />
                        <Row data={['8', '2024-05-01', '239', 'Low', 'High']} style={[styles.row, styles.lastRow]} textStyle={styles.rowText} />
                    </Table>
                </View>
                <View style={{ height: 40 }}></View>
                <View style={styles.buttonContainer}>
                    <Button title="Download" 
                    color="orange"
                    />
                </View>
                <View style={{ height: 40 }}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'ghostwhite',
        paddingHorizontal: 20
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
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
    },
    inputHeader1: {
        marginBottom: 5,
        left: 20,
        fontWeight: 'bold',
    },
    inputHeader2: {
        marginBottom: 5,
        left: 60,
        fontWeight: 'bold',
    },
    searchIcon: {
        marginLeft: 10,
        marginRight: 10,
    },
    buttonContainer: {
        borderRadius: 25,
        width:200,
        left:80,
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
      buttonContainer1: {
        borderRadius: 25,
        width:150,
        left:10,
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
      buttonContainer2: {
        borderRadius: 25,
        width:150,
        right:20,
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
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
    head: {
        height: 40,
        backgroundColor: 'orange',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        textAlign: 'center',
    },
    lastRow: {
        borderBottomWidth: 0
    },
    row: { 
        flex:1,
        borderBottomWidth: 1,
        width:'100%',
        borderBottomColor: 'black' 
    },
    text: { 
        fontSize:12,
        margin: 0,
        left:10,
        color: 'white'
    },
    rowText: {
        margin: 6,
        left: 10,
        color: 'black'
    },
    downloadButton: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        borderRadius: 25,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
});