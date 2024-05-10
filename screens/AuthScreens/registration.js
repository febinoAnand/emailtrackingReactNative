import {View,TextInput,Button,StyleSheet} from "react-native";

export default function Registration({navigation}){
    return(
        <View style={styles.centerText}>
            
            <TextInput style={styles.textInput} placeholder="Name"/>
            <TextInput style={styles.textInput} placeholder="Designation"/>
            <TextInput style={styles.textInput} placeholder="Password"/>
            <TextInput style={styles.textInput} placeholder="Confirm Password"/>
            <View style={styles.button}>
                <Button title = "Submit"
                    onPress={()=>{
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
        gap:10,
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