import React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';

export default function Title2(props) {
  const { title = 'This is a title' } = props;
  return (
    <Text style={styles.text}>
        {title}
    </Text>
  );
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  
  text: {
    fontSize: Math.min(width, height) * 0.06,
    lineHeight: 38,
    
    paddingTop: 30,
    paddingHorizontal: 25,
    color: 'black',
  },
});