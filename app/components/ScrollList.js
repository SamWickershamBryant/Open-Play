import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

export default function ScrollList(props) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
          <Text style={styles.item}>{item}</Text>
          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.buttonText} onPress={() => props.exit(item)}>Leave Queue</Text>
          </TouchableOpacity>
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
      />
    </View>
  );
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex:1,
    
    width:'95%',
  },
  listContainer: {
    flexGrow: 1,
  },
  item: {
   
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize:Math.min(width, height) * 0.03,
    width:'50%',
  },
  
  itemContainer: {
    flexDirection: 'row',
   
    alignItems: 'center',
    justifyContent:'space-evenly',
  },
  modifyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize:Math.min(width, height) * 0.02,
  },
});