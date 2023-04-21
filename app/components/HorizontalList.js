// ScrollList.js

import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';

export default function HorizontalList(props) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        horizontal // Set the FlatList to display items horizontally
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
  },
  listContainer: {
    flexGrow: 1,
  },
  item: {
    padding: width * 0.02,
    
    fontSize: height * 0.02,
    width: 'auto', // Set the width to auto to adjust based on the item's content
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8, // Add horizontal padding between the items
  },
});
