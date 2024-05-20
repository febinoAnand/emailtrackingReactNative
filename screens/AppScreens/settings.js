import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function Settings({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ height: 40 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Profile</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ViVO V9 pro"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>User Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2.1"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Designation</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ViVO V9 pro"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Mobile No</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2.1"
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.inputTitle}>
                <View style={styles.head}>
                    <Text style={styles.topHeader}>Device</Text>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Device Model</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ViVO V9 pro"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>App Version</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2.1"
                        />
                    </View>
                </View>
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Last Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="30-04-2024  12:24 PM"
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Change Password"
                    color="#FF6E00"
                />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.buttonContainer1}>
                <Button
                    title="Logout"
                    color="#FF6E00"
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                />
            </View>
            <View style={{ height: 40 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ghostwhite'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'ghostwhite'
    },
    topHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "space-between",
        width: '100%',
    },
    inputContainer: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        height:70
    },
    inputHeader: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
    },
    head: {
        backgroundColor: '#FF6E00',
        width: '108.5%',
        bottom:12,
        padding: 10,
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    buttonContainer1: {
        borderRadius: 25,
        width:180,
        left:110,
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
    downloadButton: {
        height: 30,
        width: 200,
        fontSize: 40,
        left: 8,
        borderRadius: 200,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 8,
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