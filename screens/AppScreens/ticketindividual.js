import {View,Text,StyleSheet} from 'react-native';

export default function TicketIndividual(){
    return(
        <View style={styles.container}>
            <Text>TicketIndividual</Text>
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