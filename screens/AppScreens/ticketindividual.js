import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function TicketIndividual({ route, navigation }) {
    const { item } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                navigation.replace('Ticket');
            });

            return unsubscribe;
        }, [])
    );

    const formatRequiredJson = () => {
        let formattedData = [];
        for (const key in item.required_json) {
            formattedData.push(
                <View key={key} style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={styles.inputHeader}>{key} :</Text>
                    <Text style={styles.ticketDetailText}> {item.required_json[key]}</Text>
                </View>
            );
        }
        return formattedData;
    };

    return (
        <View style={styles.container}>
            <View style={{ height: 40 }}></View>
            <View style={styles.spacer}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Ticket</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Date</Text>
                        <TextInput
                            placeholder={item.date}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Time</Text>
                        <TextInput
                            placeholder={item.time}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Ticket Name</Text>
                        <TextInput
                            placeholder={item.ticketname}
                            editable={false}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.spacer}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Fields</Text>
                </View>
                {formatRequiredJson()}
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
        fontSize: 15,
        fontWeight: 'bold',
        top:7,
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
    inputHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    head: {
        backgroundColor: '#FF6E00',
        width: '108%',
        borderColor: '#FF6E00',
        padding: 10,
        top: -12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    ticketDetailText: {
        color: 'gray',
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
    ticketText: {
        color: 'gray'
    }
});