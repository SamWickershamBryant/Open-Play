import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Keyboard } from 'react-native';

import BigButton from '../components/BigButton';
import Title from '../components/Title';
import Title2 from '../components/Title2';
import MainInput from '../components/MainInput';

import ScrollList from '../components/ScrollList';
import Divider from '../components/Divider';
import { Court } from '../components/Court';



const HomeScreen = ({ navigation, queue }) => {
    const [name, setName] = useState('');

   

    const exitPlayer = (name) => {
      queue.exitQueue(name)
    }

    const plyrInCourts = async (name) => {
      const courts = await Court.getAll()
      var players = []
        for (c in courts){
          
          players = players.concat(courts[c].players.map((p) => p.name))
        }
        return players.includes(name)
    }

   
    
    
    return (
        
        
        <SafeAreaView style={{
            flex:1,
            alignItems:'center',
            
            
        }}>
          
          
            <Title title="Pickleball App"/>
            
      <View style={styles.container}>
        
        <Title2 title="Join the next available game:"/>


        
        <MainInput placeholder="Name"
            val={name}
            onChange={setName} />
        
        <BigButton
          title="Join the queue"
          onPress={ async () => {
            console.log(name)
            if (name == ''){
                alert("Please enter your name first.")
                return
            }
            if (queue.queue.some((obj) => obj.name === name)){
              alert("This name is already in the queue, try adding your last initial.")
              return
            }
            if (await plyrInCourts(name)){
              alert("This name is already in a court, try adding your last initial.")
              return
            }
            queue.enqueue({name:name, rank:0})
            //alert("You have been added, " + name + ". Please wait to be assigned to the next free court.")
            setName('')
            Keyboard.dismiss()
        }}
        />
        <Divider/>
        <View style={styles.queue}>
        <Text style={styles.queueHeader}>Next in Queue ({queue.queue.length})</Text>
        
        <ScrollList data={queue.queue.map((obj) => obj.name)} exit={exitPlayer}></ScrollList>
        </View>
        
        
        
        
        
      </View>
      
      </SafeAreaView>
      
      
      
    );
  };
  const {width, height} = Dimensions.get('window')
  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      padding:10,
      width:"100%",
      marginTop:20,
      
    },
    queue: {
      flex:1,
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:'2%',
      
      
    },
    queueHeader: {
      fontSize:Math.min(width, height) * 0.06,
      marginBottom:'2%',
    },
    footButton: {
        position:"absolute",
        right:10,
        bottom:10,
    }
  });
  

export default HomeScreen;