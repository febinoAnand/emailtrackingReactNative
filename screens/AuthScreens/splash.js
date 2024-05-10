import {View, Text, Button, StyleSheet} from 'react-native'


export default function Splash({navigation}) {
    return (
        <View style = {styleContainer.button}>
            <Text>Loading....</Text>
        </View>
    )
}

const styleContainer = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})