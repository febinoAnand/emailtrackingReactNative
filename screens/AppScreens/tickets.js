import {View,Text,StyleSheet} from 'react-native';

export default function Ticket(){
    return(
        <View style={styles.container}>
            <Text>Ticket</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})