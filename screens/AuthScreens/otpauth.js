import {View,Text,TextInput,Button,StyleSheet} from 'react-native'


export default function OTPAuth({navigation}){
    return(
        <View style={style.container}>
        <View>
            <Text>OTP was sent to +91-9790928992</Text>
            <Text>Click here to change mobile no</Text>
        </View>
        <View >
            <TextInput style={style.textInput}/>
            <Text>Resend in 20 sec....</Text>
        </View>
        <View style={style.buttonContainer}>
            <View >
                <Button title="Resend" 
                    onPress={()=>{
                        alert("Resend..OK");
                    }}
                />
            </View>
            <View>
                <Button title="Submit"
                    onPress={()=>{
                        navigation.navigate("Registration")
                    }}
                />
            </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around",
        padding : 20
    },textInput:{
        borderWidth:1,
        borderColor:"black",
        height:40,
        width:250,
        margin:10,
        borderRadius:10,
        padding:5
    },buttonContainer:{
        flexDirection:"row",
        gap:20
    }

})