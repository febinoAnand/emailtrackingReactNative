import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function InboxIndividual({ route, navigation }) {
    const { item } = route.params;

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                navigation.replace('Inbox');
            });

            return unsubscribe;
        }, [])
    );


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>From: {item.from_email}</Text>
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
                        <Text style={styles.inputHeader}>To Mail</Text>
                        <TextInput
                            placeholder={item.to_email}
                            editable={false}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.heads}>
                    <Text style={styles.topHeader}>Subject: {item.subject}</Text>
                </View>
                <Text>Message: {item.message}</Text>
            </View>
            <View style={{ height: 20 }}></View>
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
        fontWeight: 'bold',
        marginBottom: 10,
        color:'white'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor:'#FF6E00',
        width: '108%',
        borderColor:'#FF6E00',
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    heads: {
        backgroundColor:'#FF6E00',
        width: '108%',
        borderColor:'#FF6E00',
        padding: 10,
        top:-12.5,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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