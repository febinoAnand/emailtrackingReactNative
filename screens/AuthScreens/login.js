import {View,TextInput, StyleSheet,Button} from 'react-native';


export default function Login({navigation}){
    return(
        <View style={styles.centerText} >
            
            <TextInput 
            style={styles.textInput} placeholder="User Name"/>
            <TextInput 
            style={styles.textInput} placeholder="Password"/>
            <View style={styles.button}>
                <Button title="submit" 
                onPress={()=>{
                    navigation.navigate("TabScreen")
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