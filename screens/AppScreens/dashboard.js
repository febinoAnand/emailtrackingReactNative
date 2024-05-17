import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import PieChart from 'react-native-pie-chart'
import NetInfo from '@react-native-community/netinfo';
import { BaseURL } from '../../config/appconfig';

export default function Dashboard(){

    const [totalTickets, setTotalTickets] = useState(0);
    const [notificationTickets, setNotificationTickets] = useState(0);
    const [recentData, setRecentData] = useState([]);
    const tableHead = ['S.No', 'Date', 'Param 1', 'Param 2', 'Param 3'];
    const widthAndHeight = 200
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
    // const sliceLabel = ['', '', '', '', '']
    const sliceLabel = ['Yellow', 'Orange', 'Light Orange', 'Dark Orange', 'Red']

    // const generateRandomValues = () => {
    //     const randomValues = [];
    //     for (let i = 0; i < sliceColor.length; i++) {
    //         randomValues.push(Math.floor(Math.random() * 1000));
    //     }
    //     return randomValues;
    // };

    // const [series, setSeries] = useState(generateRandomValues());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setSeries(generateRandomValues());
    //     }, 5000);
    //     return () => clearInterval(intervalId);
    // }, []);

    // const calculatePercentage = (value, total) => {
    //     return ((value / total) * 100).toFixed(2) + '%';
    // };

    // const updatedsliceLabel = sliceLabel.map((label, index) => {
    //     const percentage = calculatePercentage(series[index], series.reduce((acc, cur) => acc + cur, 0));
    //     return `${label} ${percentage}`;
    // });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BaseURL+ "emailtracking/ticket/");
                const result = await response.json();
                const total = result.length;
                setTotalTickets(total);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchNotificationTickets = async () => {
            try {
                const response = await fetch(BaseURL+ "emailtracking/inbox/");
                const result = await response.json();
                const totalNotifications = result.length;
                setNotificationTickets(totalNotifications);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotificationTickets();
    }, []);
    
    useEffect(() => {
        const fetchRecentData = async () => {
            try {
                const response = await fetch(BaseURL + "emailtracking/ticket/");
                const result = await response.json();
                setRecentData(result.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecentData();
    }, []);

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ height: 40 }}></View>
            <View style={{ flexDirection: 'row',gap:20 }}>
                <View style={styles.inputTitle}>
                    <View style={styles.head}>
                        <Text style={styles.topHeader}>Total Ticket</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 60, textAlign:'center' }}>{totalTickets}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.inputTitle}>
                    <View style={styles.head}>
                        <Text style={styles.topHeader}>Notification Ticket</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 60, textAlign:'center' }}>{notificationTickets}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitles}>
                <View style={styles.heads}>
                    <Text style={styles.topHeader}>Pie Chart</Text>
                </View>
                <PieChart
                    style={styles.pie}
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />
                <View style={styles.legendContainer}>
                    {sliceLabel.map((label, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: sliceColor[index] }]}></View>
                            <Text style={styles.legendText}>{label}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.tableContainer}>
                <Table>
                    <Row data={tableHead} style={styles.head3} textStyle={styles.text} />
                    {recentData.map((rowData, index) => (
                        <Row
                            key={index}
                            data={[
                                (index + 1).toString(),
                                rowData.date,
                                rowData.actual_json,
                                rowData.required_json,
                                rowData.log
                            ]}
                            style={[styles.row, index === recentData.length - 1 && styles.lastRow]}
                            textStyle={styles.rowText}
                        />
                    ))}
                </Table>
            </View>
            <View style={{ height: 40 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ghostwhite'
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'ghostwhite'
    },
    topHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'white'
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 1,
    },
    head: {
        backgroundColor:'darkorange',
        width: '118%',
        borderColor:'darkorange',
        borderRadius:3,
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heads: {
        backgroundColor:'darkorange',
        width: '107.5%',
        borderColor:'darkorange',
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    head3: {
        height: 40,
        backgroundColor: 'darkorange',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        textAlign: 'center',
    },
    rowText: { 
        flex:1,
        margin: 6,
        left:10, 
        color: 'black'
    },
    row: { 
        flex:1,
        borderBottomWidth: 1,
        width:'100%',
        borderBottomColor: 'black' 
    },
    pie: {
        right:60
    },
    tableContainer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
    },
    text: { 
        fontSize:10,
        margin: 6,
        left:10,
        color: 'white'
    },
    lastRow: {
        borderBottomWidth: 0
    },
    downloadButton: {
        height: 30,
        width: 200,
        fontSize: 40,
        left:8,
        borderRadius: 200,
        overflow: 'hidden',
    },
    inputTitle: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '42%',
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
    inputTitles: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        width: '90%',
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
    legendContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 70,
        left: 230,
    },    
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    legendText: {
        fontSize: 14,
        color: 'black',
    },
})