import { View, TextInput, Image, StyleSheet } from "react-native";
import { SimpleLineIcons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';

export default function Registration({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/ifm.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.centerText}>
                <View style={styles.inputContainer}>
                    <SimpleLineIcons name="user" size={20} color="orange" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Name' />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name="user-graduate" size={20} color="orange" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Designation' />
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="unlock" size={20} color="orange" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password' />
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="unlock" size={20} color="orange" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Confirm Password' />
                </View>
            </View>
            <View style={[styles.circle, { backgroundColor: 'orange' }]}>
                <MaterialIcons name="arrow-forward-ios" size={24} color="white"
                    onPress={() => {
                        navigation.navigate("Login")
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centerText: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "orange",
        height: 45,
        width: 300,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 40,
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        left: 130,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.84,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
})