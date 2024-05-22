import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DatePicker from '@react-native-community/datetimepicker';
import { BaseURL } from '../../config/appconfig';
import { TouchableOpacity } from 'react-native';

export default function Reports() {
    const [searchText, setSearchText] = useState('');
    const [tableData, setTableData] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    useEffect(() => {
        fetchData();
    }, [fromDate, toDate]);

    const fetchData = async () => {
        try {
            const response = await fetch(BaseURL + "emailtracking/ticket/");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showFromDate = () => {
        setShowFromDatePicker(true);
    };

    const showToDate = () => {
        setShowToDatePicker(true);
    };

    const filteredData = tableData.filter(rowData => {
        const rowDate = new Date(rowData.date);
        return rowDate >= fromDate && rowDate <= toDate;
    });    

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search                                                                                   "
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                </View> */}
                <View style={{ height: 20 }}></View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader1}>From Date</Text>
                        <View style={styles.buttonContainer2}>
                        <TouchableOpacity 
                            onPress={showFromDate} 
                            style={[styles.dateButton, { backgroundColor: 'white' }]}>
                            <Text style={styles.buttonText}>{fromDate ? fromDate.toDateString() : 'Select Date'}</Text>
                        </TouchableOpacity>
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
                        <TouchableOpacity 
                            onPress={showToDate} 
                            style={[styles.dateButton, { backgroundColor: 'white' }]}>
                            <Text style={styles.buttonText}>{toDate ? toDate.toDateString() : 'Select Date'}</Text>
                        </TouchableOpacity>
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
                        <Row data={['Ticket Name', 'Date', 'Time']} style={styles.head} textStyle={styles.text} />
                        {filteredData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={[
                                    rowData.ticketname,
                                    rowData.date,
                                    rowData.time,
                                ]}
                                style={[styles.row, index === filteredData.length - 1 && styles.lastRow]}
                                textStyle={styles.rowText}
                            />
                        ))}
                    </Table>
                </View>
                <View style={{ height: 40 }}></View>
                <View style={styles.buttonContainer}>
                    <Button title="Download" 
                    color="#FF6E00"
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
        backgroundColor: '#FF6E00',
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
    dateButton: {
        borderRadius: 25,
        width: 150,
        height:30,
        overflow: 'hidden',
        alignSelf: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },    
    text: { 
        fontSize:12,
        margin: 0,
        left:30,
        color: 'white'
    },
    rowText: {
        margin: 6,
        left: 20,
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