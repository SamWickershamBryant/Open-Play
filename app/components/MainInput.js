import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';

export default function MainInput(props) {
  const { placeholder = 'Enter something here', val, onChange } = props;
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.input}
      >
    <TextInput 
        style={styles.inputBox}
        onChangeText={onChange}
        value={val}
        placeholder={placeholder}
        onTouchStart={() => false}
    />
    </KeyboardAvoidingView>

  );
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({

  inputBox: {
    fontSize:Math.min(width, height) * 0.05,
    justifyContent:'center',
    
  },
  
    input: {
        height: height * .08,
        width: "95%",
        justifyContent:'center',
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});