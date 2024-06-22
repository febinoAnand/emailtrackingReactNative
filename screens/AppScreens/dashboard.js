import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Svg, { Rect } from 'react-native-svg';
import { BaseURL } from '../../config/appconfig';

export default function Dashboard() {
    const [totalTickets, setTotalTickets] = useState(0);
    const [notificationTickets, setNotificationTickets] = useState(0);
    const [ticketData, setTicketData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(BaseURL + "emailtracking/dashboard/");
                const result = await response.json();

                setTotalTickets(result.total_tickets);
                setNotificationTickets(result.total_inbox);

                const departmentCounts = result.department_ticket_count.reduce((acc, dept) => {
                    acc[dept.department_name] = dept.ticket_count;
                    return acc;
                }, {});

                const maxValue = Math.max(...Object.values(departmentCounts));
                const randomColors = Array.from({ length: result.department_ticket_count.length }, () => '#' + (Math.random().toString(16) + '000000').slice(2, 8));
                const barChartData = Object.keys(departmentCounts).map((dept, index) => ({
                    label: dept,
                    value: departmentCounts[dept] || 0,
                    scaledValue: (departmentCounts[dept] || 0) * 100 / maxValue,
                    color: randomColors[index]
                }));

                setBarChartData(barChartData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await fetch(BaseURL + "emailtracking/ticket/");
                const result = await response.json();

                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                const recentEntries = result.slice(0, 10);
    
                setTicketData(recentEntries);
    
                if (recentEntries.length > 0) {
                    const headers = Object.keys(recentEntries[0].actual_json || {});
                    setTableHead(['Date', 'Time', ...headers]);
                }
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };
    
        fetchTicketData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ height: 40 }} />
            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={styles.inputTitle}>
                    <View style={styles.head}>
                        <Text style={styles.topHeader}>Total Ticket</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 60, textAlign: 'center' }}>{totalTickets}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.inputTitle}>
                    <View style={styles.head}>
                        <Text style={styles.topHeader}>Total Inbox</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 60, textAlign: 'center' }}>{notificationTickets}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }} />
            <View style={styles.inputTitles}>
                <View style={styles.heads}>
                    <Text style={styles.topHeader}>Ticket Analysis</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}>
                    {barChartData.map((data, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ width: 100, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text style={{ marginRight: 5 }}>{data.label}</Text>
                            </View>
                            <Svg height="40" width={data.scaledValue + 20}>
                                <Rect
                                    x="0"
                                    y="0"
                                    width={data.scaledValue}
                                    height="30"
                                    fill={data.color}
                                />
                            </Svg>
                            <Text style={{ marginRight: 20, flex: 1, textAlign: 'center' }}>{data.value}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{ height: 40 }} />
            <View style={styles.tableContainer}>
                <ScrollView horizontal>
                    <Table>
                        <Row data={tableHead} style={styles.head3} textStyle={styles.text} />
                        {ticketData.map((rowData, index) => (
                            <Row
                                key={index}
                                data={[
                                    rowData.date,
                                    rowData.time,
                                    ...(tableHead.slice(2).map(header => rowData.actual_json ? rowData.actual_json[header] || '-' : '-'))
                                ]}
                                style={[styles.row, index === ticketData.length - 1 && styles.lastRow]}
                                textStyle={styles.cellText}
                            />
                        ))}
                    </Table>
                </ScrollView>
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
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
        fontSize: 15,
        top: 5,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
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
        backgroundColor: '#FF6E00',
        width: '118%',
        borderColor: '#FF6E00',
        borderRadius: 3,
        padding: 10,
        top: -12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heads: {
        backgroundColor: '#FF6E00',
        width: '107.5%',
        borderColor: '#FF6E00',
        padding: 10,
        top: -12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
    rowText: {
        margin: 6,
        left: 20,
        color: 'black',
        fontSize: 12
    },
    row: {
        flex: 1,
        borderBottomWidth: 1,
        width: '100%',
        height: 80,
        borderBottomColor: 'black'
    },
    pie: {
        right: 60
    },
    tableContainer: {
        flex: 1,
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
        overflowX: 'auto',
        display: 'flex',
    },
    text: {
        flexWrap: 'wrap',
        width: 80,
        left:10,
        maxWidth: 80,
        textAlign: 'left',
        color: 'white'
    },
    lastRow: {
        borderBottomWidth: 0
    },
    downloadButton: {
        height: 30,
        width: 200,
        fontSize: 40,
        left: 8,
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
    cellText: {
        flexWrap: 'wrap',
        left:15,
        width: 50,
        maxWidth: 50,
        textAlign: 'left'
    }
});