import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


export default function Dashboard(){
    return(
        <View style={styles.container}>
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
                
            </View>
        </View>
    )
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
    },
    heads: {
        backgroundColor:'orange',
        width: '107%',
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
})