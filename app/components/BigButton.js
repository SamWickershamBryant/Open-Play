import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function BigButton(props) {
  const { onPress, title = 'Button' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: "5%",
    //paddingHorizontal: "30%",
    width:"95%",
    marginTop: 1,
    marginBottom:30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'dodgerblue',
  },
  text: {
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});