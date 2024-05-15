import { TextInput, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function ValidationTextInput(props) {
  const [text, setText] = useState();
  const [validationMessage, setValidationMessage] = useState();

  const handleTextChange = (input) => {
    setText(input);
    props.onChangeState(input);
    if (validationMessage) {
      validate(input);
    }
  };

  const validate = (input) => {
    const isValid = props.regex.test(input);
    if (!isValid) {
      setValidationMessage(props.validationMessage);
    } else {
      setValidationMessage();
    }
  };

  useEffect(()=>{
    // alert("this is test")
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{validationMessage}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        onEndEditing={() => validate(text)}
        
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  msg: {
    color: "red",
    marginBottom: 4,
  },
  input: {
    width:300,
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 8,
  },
});