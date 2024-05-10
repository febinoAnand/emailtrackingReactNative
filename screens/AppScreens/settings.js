import {View,Text,Button,StyleSheet} from 'react-native';

export default function Settings({navigation}){
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
            <Button title="Logout"
                onPress = {()=>{
                        navigation.navigate("Login")
                    }
                }
            />
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