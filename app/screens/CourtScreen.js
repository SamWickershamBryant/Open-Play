import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity, TextInput, Button, Switch } from 'react-native';
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
      console.log("CHECK")
    }, [])

    const assignPlayers = async (cour) => {
      console.log(cour)
      const availablePlayers = 4 - cour.players.length;
      if (cour.players.length >= 4) {
        alert("This court is already full.");
        return;
      }
      if (queue.queue.length < availablePlayers) {
        alert("Not enough players in the queue to fill the court.");
        return;
      }
    
      let updatedPlayers = cour.players;
      
      var newPlayers = queue.dequeue(availablePlayers)
      console.log(newPlayers)
      for (var i in newPlayers){
        updatedPlayers.push({name:newPlayers[i],winner:false})
      }
    
      var updatedCourt = cour
      updatedCourt.players = updatedPlayers
      
      
      setCourts((prevCourts) => {
        const newCourts = [...prevCourts];
        const courtIndex = prevCourts.findIndex(court => court.name === cour.name);
        newCourts[courtIndex] = updatedCourt;
        return newCourts;
      })
      await updatedCourt.save();
        
    };

    const substitutePlayer = async (cour, playerIndex) => {
      if (cour.inProgress) {
        alert("Cannot substitute players after the game has started.");
        return;
      }
    
      const playerToRemove = cour.players[playerIndex];
      queue.enqueue(playerToRemove.name);
    
      var updatedCourt = cour//{ ...cour, players: cour.players.filter((_, index) => index !== playerIndex) };
      updatedCourt.players = cour.players.filter((_, index) => index !== playerIndex)
      const success = await updatedCourt.save();
      if (success) {
        setCourts((prevCourts) => {
          const newCourts = [...prevCourts];
          const courtIndex = prevCourts.findIndex(court => court.name === cour.name);
          newCourts[courtIndex] = updatedCourt;
          return newCourts;
        });
      }
    };
    

    const courtsThatNeedPlayers = (l) => {
      var ret = []
      for (c in courts){
        let cPlayers = courts[c].players
        if (cPlayers.length < l){
          ret.push(courts[c])
        }
      }
      return ret
    }

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
      
      for (let index = court.players.length - 1; index >= 0; index--){
        console.log(index)
        let player = court.players[index]
        if (!player.winner) {
          // Not a winner, remove and add back to queue...
          const rName = player.name
          
          court.removePlayer(rName)
          queue.enqueue(rName)
        } else{
          player.winner = false
        }

      }
      court.inProgress = false
      court.save()
      console.log(court)

    }

    const handleCourtStart = async (cour) => {
      if (cour.players.length < 4){
        alert("Please wait for players to be assigned to this court.")
        return
      }
      var i = courts.findIndex(court => court.name === cour.name)
      var newCourt = courts[i]
      newCourt.inProgress = true
      setCourts((prevCourts) => {
        const newCourts = [...prevCourts]; // create a copy of the courts array
        newCourts[i] = newCourt; // replace the old court object with the updated one
        return newCourts; // set the state with the new array
      });
      await newCourt.save()
    }

    const setWinners = async (cour, ind) => {
      if (cour.players.length < 4) return
      var i = courts.findIndex(court => court.name === cour.name)
      var newCourt = courts[i]
      newCourt.players[ind * 2].winner = !newCourt.players[ind * 2].winner
      newCourt.players[ind * 2 + 1].winner = newCourt.players[ind * 2].winner
      setCourts((prevCourts) => {
        const newCourts = [...prevCourts]; // create a copy of the courts array
        newCourts[i] = newCourt; // replace the old court object with the updated one
        return newCourts; // set the state with the new array
      });
      var flip = ind ^ 1
      if (newCourt.players[ind * 2].winner && newCourt.players[flip * 2].winner){
        setWinners(cour,flip)

      }
      await newCourt.save()
      
    }

    const areWinners = (cour, ind) => {
      if (!cour.inProgress || cour.players.length < 4 || ind > 1){
        return false
      }
      var i = courts.findIndex(court => court.name === cour.name)
      var viewCourt = courts[i]
      return viewCourt.players[ind * 2].winner
    }

    const renderCourt = ({ item }) => {
      const renderPlayersGrid = () => {
        
        const rows = [];
        for (let i = 0; i < 2; i++) {
          const cells = [];
          for (let j = 0; j < 2; j++) {
            const playerIndex = i * 2 + j;
            if (playerIndex < item.players.length) {
              cells.push(
                
                <View key={playerIndex} style={styles.nameContainer}>
                <Text  style={item.players[playerIndex].winner ? styles.playerNameWinner : styles.playerName}>
                  - {item.players[playerIndex].name}
                  
                </Text>
                {!item.inProgress && (
                  <TouchableOpacity style={styles.substituteButton} onPress={() => substitutePlayer(item, playerIndex)}>
                    <Text style={styles.buttonText}>Substitute</Text>
                  </TouchableOpacity>
                )}
                </View>
                
              );
            } else {
              cells.push(
                <View style={styles.nameContainer}>
              <Text key={playerIndex} style={styles.playerName}>
                - 
              </Text>
              </View>
              );
            }
          }
          rows.push(
            
            <View key={i} style={styles.playersRow}>
              <Text style={styles.playerHeading}>Team {i + 1} {areWinners(item,i) ? "(Winners)" : ""}</Text>
              
              {cells}
              {item.inProgress && (
              <View style={
                {

                  width:'100%',
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center',
                  marginTop:'3%',
                  
                
              }
              }>
              <Text>winner: </Text><Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setWinners(item,i)}
              value={areWinners(item,i)}
              />
              </View>
              )}
              
            </View>
            
          );
        }
        return rows;
      };
    
      return (
        

        <TouchableOpacity style={styles.court}>
          
          <Text style={styles.courtName}>{item.name}</Text>
          
          <View style={styles.playersGrid}>{renderPlayersGrid()}</View>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveCourt(item.name)}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
          {item.inProgress ? 
          <TouchableOpacity style={styles.finishButton} onPress={() => handleCourtFinish(item)}>
          <Text style={styles.removeButtonText}>Finish Game</Text>
          </TouchableOpacity> :
          <>
          <TouchableOpacity style={styles.assignButton} onPress={() => assignPlayers(item)}>
          <Text style={styles.buttonText}>Assign Players</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={() => handleCourtStart(item)}>
          <Text style={styles.removeButtonText}>Start Game</Text>
          </TouchableOpacity>
          </>
        }
          
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
      padding: 8,
      margin: 8,
      minHeight: 250,
      minWidth: '45%',
      maxWidth: '45%',
      position: 'relative',
      alignItems:'center',
    },
    
    courtName: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'red',
      
      
    },
   
    playersGrid: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      
      width:"100%",
      
      marginHorizontal:0,
      marginTop:0,
    },
    playersColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      
      alignItems: 'center',
      
      
      
    },
    playersRow: {
      flex:1,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'flex-start',
      height:'80%',
      
      
    },
    playerCell: {
      flex: 1,
      margin: 4,
      
    },
    playerName: {
      
      
      fontSize: 20,
      
      
      
    },
    nameContainer: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly',
      width:'90%',
      
    },
    playerHeading: {
      fontSize:24,
      fontWeight:'bold',
      marginBottom:'5%',
    },
    playerNameWinner: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'green',
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
    substituteButton: {
      backgroundColor: 'dodgerblue',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 25,
      
      
    },
    finishButton: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: 'red',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: "25%",
      height: 30,
    },
    startButton: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: 'green',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: "25%",
      height: 30,
    },
    removeButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    assignButton: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      backgroundColor: 'orange',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: "30%",
      height: 30,
    },
    buttonText: {
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