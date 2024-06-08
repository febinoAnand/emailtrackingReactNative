import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import DatePicker from '@react-native-community/datetimepicker';
import { BaseURL } from '../../config/appconfig';
import { TouchableOpacity } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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
            const response = await fetch(BaseURL + "emailtracking/report/");
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

    const generatePDF = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                throw new Error('Storage permission denied');
            }
            let htmlContent = `<html><body><h1>Report</h1>`;
            
            if (filteredData.length > 0) {
                htmlContent += `<table border="1">
                                    <tr>
                                        <th>Ticket Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Rule</th>
                                        <th>Message</th>
                                        <th>Send To user</th>
                                        <th>Operator</th>
                                        <th>Value</th>
                                        <th>Logical Operator</th>
                                        <th>Actual Value</th>
                                    </tr>`;
    
                filteredData.forEach(rowData => {
                    htmlContent += `<tr>
                                        <td>${rowData.ticket.ticketname}</td>
                                        <td>${rowData.date}</td>
                                        <td>${rowData.time}</td>
                                        <td>${rowData.active_trigger.trigger_name}</td>
                                        <td>${rowData.active_trigger.notification_message}</td>
                                        <td>${rowData.active_trigger.user_to_send}</td>
                                        <td>${rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].operator : ''}</td>
                                        <td>${rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].value : ''}</td>
                                        <td>${rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].logical_operator : ''}</td>
                                        <td>${rowData.actual_value}</td>
                                    </tr>`;
                });
    
                htmlContent += `</table>`;
            } else {
                htmlContent += `<p>No data available</p>`;
            }
    
            htmlContent += `</body></html>`;

            const options = {
                html: htmlContent,
                fileName: 'report',
                directory: 'Documents',
            };
            
            const file = await RNHTMLtoPDF.convert(options);
            console.log('PDF generated successfully:', file.filePath);
            alert('PDF generated successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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
                <ScrollView horizontal>
                    <Table>
                        <Row data={['Ticket Name', 'Date', 'Time', 'Rule', 'Message', 'Send To user' , 'Operator', 'Value', 'Logical Operator', 'Actual Value']} style={styles.head3} textStyle={styles.text} />
                        {filteredData.length > 0 ? (
                                filteredData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={[
                                            rowData.ticket.ticketname,
                                            rowData.date,
                                            rowData.time,
                                            rowData.active_trigger.trigger_name,
                                            rowData.active_trigger.notification_message,
                                            rowData.active_trigger.user_to_send,
                                            rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].operator : '',
                                            rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].value : '',
                                            rowData.active_trigger.parameter_filter_list && rowData.active_trigger.parameter_filter_list.length > 0 ? rowData.active_trigger.parameter_filter_list[0].logical_operator : '',
                                            rowData.actual_value,
                                        ]}
                                        style={[styles.row, index === filteredData.length - 1 && styles.lastRow]}
                                        textStyle={styles.cellText}
                                    />
                                ))
                            ) : (
                                <Text style={styles.noDataText}>       No data available                                                                                        No data availables</Text>
                            )}
                    </Table>
                    </ScrollView>
                </View>
                <View style={{ height: 40 }}></View>
                <View style={styles.buttonContainer}>
                    <Button title="Download"
                        color="#FF6E00"
                        onPress={generatePDF}
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
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
        overflowX: 'auto',
        display: 'flex',
    },
    head3: {
        backgroundColor: '#FF6E00',
        width: '100%',
        height: 70,
        marginTop: 10,
        borderColor: '#FF6E00',
        padding: 10,
        top: -10,
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        flex: 1,
        borderBottomWidth: 1,
        width: '100%',
        height: 50,
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
        flexWrap: 'wrap',
        width: 80,
        left:10,
        maxWidth: 80,
        textAlign: 'left',
        color: 'white'
    },
    rowText: {
        margin: 6,
        left: 20,
        color: 'black'
    },
    cellText: {
        flexWrap: 'wrap',
        left:15,
        width: 50,
        maxWidth: 50,
        textAlign: 'left'
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
    noDataText: {
        textAlign: 'center',
        color: 'black',
        marginTop: 20,
        right:20,
        top:150,
        fontSize: 18,
    },
});