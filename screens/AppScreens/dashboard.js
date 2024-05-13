import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import PieChart from 'react-native-pie-chart'

export default function Dashboard(){

    const tableHead = ['S.No', 'Date', 'Param 1', 'Param 2', 'Param 3'];
    const widthAndHeight = 200
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
    const sliceLabel = ['Yellow', 'Orange', 'Light Orange', 'Dark Orange', 'Red']
    
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
                            <Text style={{ fontSize: 80, textAlign:'center' }}>24</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.inputTitle}>
                    <View style={styles.head}>
                        <Text style={styles.topHeader}>Notification Ticket</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: 80, textAlign:'center' }}>12</Text>
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
                    <Row data={['1', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['2', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['3', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['4', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['5', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['6', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['7', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['8', '2024-05-01', '239', 'Low' , 'High']} style={styles.row} textStyle={styles.rowText} />
                    <Row data={['9', '2024-05-01', '239', 'Low' , 'High']} style={[styles.row, styles.lastRow]} textStyle={styles.rowText} />
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
        fontSize: 20,
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
        backgroundColor:'orange',
        width: '118%',
        borderColor:'orange',
        borderRadius:3,
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heads: {
        backgroundColor:'orange',
        width: '107%',
        borderColor:'orange',
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    head3: {
        height: 40,
        backgroundColor:'orange',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    rowText: { margin: 6,
        left:10, 
        color: 'black' 
    },
    row: { 
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
        bottom: 80,
        left: 250,
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