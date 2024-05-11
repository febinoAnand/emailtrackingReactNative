import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function TicketIndividual(){
    return(
        <View style={styles.container}>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Ticket</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Date</Text>
                        <TextInput
                            placeholder="12-11-2023"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Time</Text>
                        <TextInput
                            placeholder="12:54 PM"
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.heads}>
                    <Text style={styles.topHeader}>Ticket Name</Text>
                </View>
                <Text>Ticket Type : Upper Alarm</Text>
                <Text>Occurred (UTC+0:00) : 15/11/23  12:34:03</Text>
                <Text>Threshold violation : 21cm</Text>
                <Text>Defined threshold value : 20cm</Text>
                <Text>Typology : ip rings</Text>
                <Text>Urgency : High</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    inputHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
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
        width: '108%',
        borderColor:'orange',
        borderRadius:3,
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
    },
    heads: {
        backgroundColor:'gray',
        width: '108%',
        borderColor:'orange',
        borderRadius:3,
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
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