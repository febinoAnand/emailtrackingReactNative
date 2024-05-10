import { View, TextInput, StyleSheet } from 'react-native';
import { SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';

export default function Signup({navigation}){
    return(
        <View style={styles.centerText}>
            <View style={{ height: 200 }}></View>
            <View style={styles.inputContainer}>
                <SimpleLineIcons name="user" size={20} color="orange" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email' />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.inputContainer}>
                <Ionicons name="call-sharp" size={20} color="orange" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Mobile No' />
            </View>
            <View style={styles.button}>
                <AntDesign name="rightcircle" size={50} color="orange" onPress={() => {
                    navigation.navigate("OTP")
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 3,
        borderColor: "orange",
        height: 40,
        width: 300,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 40,
    },
    icon: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    button: {
        marginTop: 200,
        left: 130
    }
});