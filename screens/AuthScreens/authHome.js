import {Text,View,TextInput, StyleSheet,Button} from 'react-native';


export default function AuthScreenHome({navigation}){
    return(
        <View style={styles.centerText} >

            <View style={styles.button}>
                <Button title="Splash Screen"
                 onPress = {() => {
                    navigation.navigate("")
                 }}
                />
            </View>
            <View style={styles.button}>
                <Button title="Sign up Screen"
                 onPress = {() => {
                    navigation.navigate("SignUp")
                 }}
                />
            </View>
            <View style={styles.button}>
                <Button title="OTP Screen"
                onPress = {() => {
                    navigation.navigate("OTP")
                 }}
                 />
            </View>
            <View style={styles.button}>
                <Button title="Registration Screen"
                onPress = {() => {
                    navigation.navigate("Registration")
                 }}
                />
            </View>
            <View style={styles.button}>
                <Button title="Login Screen"
                onPress = {() => {
                    navigation.navigate("Login")
                 }}
                />
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    centerText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        gap:30,
    },
    button:{
        marginTop:20,
        width:200,
    }


})