import { View,Text,Button } from "react-native";
// import CustomSuccessAlert from "../AuthScreens/customSuccessalert";

import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {CommonActions} from '@react-navigation/native';
import CustomAlertprompt from "../AuthScreens/customalertprompt";
import CustomAlert from "../AuthScreens/customalert";

// import CustomAlert from "../AuthScreens/customalert";



export default function NavigationwithPOPUP({navigation}){
    const [alert,setAlert] = useState(false)
    
    useEffect(()=>{
        
    },[])

    const navigateScreen = ()=>{
        setAlert(true);
        // navigation.replace("Checkscreen")  
    }
    

    return (
        <View style={styles.container}>

            <Text style={styles.textContainer}>This is test message</Text>
            <View style={styles.buttonContainer}>
                <Button title="Pop up" onPress={navigateScreen}></Button>
            </View>
            <CustomAlert
                visible={alert}
                
                onClose={()=>{
                    setTimeout(() => {
                        navigation.replace("Checkscreen")    
                    }, 100);
                      
                   
                    
                    
                    setAlert(false)
                }}
                message={"This is test"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center"
    },
    buttonContainer:{
        alignContent:"center",
        justifyContent:"center"
    },
    textContainer:{
        width:"100%", 
        textAlign:"center",
        marginBottom:10
    }
    
})