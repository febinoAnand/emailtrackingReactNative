import {View,Text,StyleSheet} from 'react-native';

export default function InboxIndividual(){
    return(
        <View style={styles.container}>
            <Text>Inbox Individuals</Text>
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