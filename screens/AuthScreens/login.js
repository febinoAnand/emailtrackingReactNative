import {View,TextInput, StyleSheet,Image} from 'react-native';
import { SimpleLineIcons, Feather, MaterialIcons } from '@expo/vector-icons';

export default function Login({navigation}){
    return(
        <View style={styles.centerText} >
            <Image
                source={require('../../assets/ifm.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={{ height: 20 }}></View>
            <View style={styles.inputContainer}>
                <SimpleLineIcons name="user" size={20} color="orange" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='User Name' />
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="orange" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password' />
            </View>
            <View style={[styles.circle, { backgroundColor: 'orange' }]}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white"
                onPress={()=>{
                    navigation.navigate("TabScreen")
                }}
                />
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
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
        borderWidth: 1,
        borderColor: "orange",
        height: 45,
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
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        left: 130,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
});