import { useEffect, useState } from "react";
import { Button, View ,Text,TextInput,StyleSheet, ToastAndroid} from "react-native";


export default function FetchDataFromURL({navigation}){

    const[urlData,setUrlData] = useState("Data will be displayed here");
    const[URLlink,setURLLink] = useState("http://do.febinosolutions.com:9002/emailtracking/");

    const getDataFromUrl =async ()=>{
        console.log("")
        console.log("url ==>",URLlink)
        const response = await fetch(URLlink)
        .then((response) => {
            ToastAndroid.show("Response->"+response.status,ToastAndroid.LONG);
            console.log(response)
            setUrlData(response.status)
            // return response.text()
        })
        .catch((error) => {
            ToastAndroid.show("Response->"+error,ToastAndroid.LONG);
          console.error(error);
        })



        
    }

    useEffect(()=>{
        // setURLLink("")
    },[]);

    return(
        <View style={styles.container}>
            <TextInput
            value={URLlink}
            onChangeText={setURLLink}
            style = {styles.textInputAlign}
            />
            <Button title="Get" onPress={getDataFromUrl}/>
            <Text style={styles.textInputAlign}>{urlData}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-evenly",
        alignContent:"center"
    },
    textInputAlign:{
        textAlign:"center"
    }
})
