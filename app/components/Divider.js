// Divider.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'grey',
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default Divider;
