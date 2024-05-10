import {Text,View,TextInput, StyleSheet,Button} from 'react-native';


export default function Signup({navigation}){
    return(
        <View style={styles.centerText} >
            <Text>Email</Text>
            <TextInput 
            style={styles.textInput}/>
            <Text>Mobile No</Text>
            <TextInput 
            style={styles.textInput}/>
            <View style={styles.button}>
                <Button title="submit" onPress = {()=>{
                    navigation.navigate("OTP")
                }}/>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    centerText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    textInput:{
        borderWidth:1,
        borderColor:"black",
        height:40,
        width:250,
        margin:10,
        borderRadius:10,
        padding:5
    },
    button:{
        marginTop:20,
    }


})