import React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';

export default function Title(props) {
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
    fontSize: Math.min(width, height) * 0.1,
    lineHeight: 20,
    fontWeight: 'bold',
    paddingTop: "10%",
    paddingBottom: "2%",
    paddingHorizontal: 25,
    color: 'dodgerblue',
    alignSelf:'center'
  },
});