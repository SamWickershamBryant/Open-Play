import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity, TextInput, Button } from 'react-native';
import Title2 from '../components/Title2';
import { useQueue } from '../components/Queue';
import { Court } from '../components/Court';


const CourtScreen = ({ navigation, queue }) => {

    const [courts, setCourts] = useState([])
    const [newCourtName, setNewCourtName] = useState('')

    useEffect(() => {
      const loadCourts = async () => {
        const courts = await Court.getAll();
        setCourts(courts);
      };
      loadCourts();
    }, [])

    const handleAddCourt = async () => {
      const court = new Court(newCourtName);
      const success = await court.save();
      if (success) {
        setCourts([...courts, court]);
        setNewCourtName('');
      }
    };

    const handleRemoveCourt = async (courtName) => {
      const success = await Court.remove(courtName);
      if (success) {
        const updatedCourts = courts.filter(court => court.name !== courtName);
        setCourts(updatedCourts);
      }
    };

    const handleCourtFinish = (court) => {
      console.log(court.name)
    }

    const renderCourt = ({ item }) => {
      const renderPlayersGrid = () => {
        if (item.players.length === 0) {
          return null;
        }
        const rows = [];
        for (let i = 0; i < 2; i++) {
          const cells = [];
          for (let j = 0; j < 2; j++) {
            const playerIndex = i * 2 + j;
            if (playerIndex < item.players.length) {
              cells.push(
                <Text key={playerIndex} style={styles.playerName}>
                  - {item.players[playerIndex]}
                </Text>
              );
            } else {
              cells.push(<View key={playerIndex} style={styles.playerCell} />);
            }
          }
          rows.push(
            <View key={i} style={styles.playersRow}>
              {cells}
            </View>
          );
        }
        return rows;
      };
    
      return (
        

        <TouchableOpacity style={styles.court} onPress={() => handleCourtFinish(item)}>
          <Text style={styles.courtName}>{item.name}</Text>
          <View style={styles.playersGrid}>{renderPlayersGrid()}</View>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveCourt(item.name)}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
        
      );
    };
    
    return (
      
      <View style={styles.container}>
        <Text style={styles.heading}>
        Available Courts ({courts.length})
      </Text>
        
      <FlatList
        data={courts}
        renderItem={renderCourt}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

    
      
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 76 : 0}
      style={styles.footer}>
      <TextInput
      style={styles.input}
      value={newCourtName}
      onChangeText={setNewCourtName}
      placeholder="Enter court name"
      />
      <Button title="Add Court" onPress={handleAddCourt} />
      </KeyboardAvoidingView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5FCFF',
    },
    heading: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      flex:1,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginRight: 16,
    
      width:"75%",
     
    },
    listContainer: {
      paddingBottom: 64, // add some padding to bottom to prevent last item from being obscured by bottom tab bar
    },
    court: {
      
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      minHeight: 150,
      minWidth: '45%',
      maxWidth: '45%',
      position: 'relative',
    },
    
    courtName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    playersGrid: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width:"50%",
      marginHorizontal:10,
      marginTop:10,
    },
    playersColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '50%',
      
    },
    playerCell: {
      flex: 1,
      margin: 4,
    },
    playerName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    removeButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'dodgerblue',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
    },
    removeButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    footer:{
      
      flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderTopWidth: 1,
    borderTopColor: '#ccc',
      bottom:25,
      left:0,
      right:0,
      padding:16,
      position:"absolute",
      width:"100%",
      
    },
  });

export default CourtScreen;