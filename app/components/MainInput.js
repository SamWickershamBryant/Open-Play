import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';

export default function MainInput(props) {
  const { placeholder = 'Enter something here', val, onChange } = props;
  
  return (
    <TextInput 
        style={styles.input}
        onChangeText={onChange}
        value={val}
        placeholder={placeholder}
        onTouchStart={() => false}
    />

  );
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  
    input: {
        height: "10%",
        width: "95%",
        fontSize:Math.min(width, height) * 0.05,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});