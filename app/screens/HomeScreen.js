import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button } from 'react-native';
import CourtScreen from './CourtScreen';
import BigButton from '../components/BigButton';
import Title from '../components/Title';
import Title2 from '../components/Title2';
import MainInput from '../components/MainInput';
import { push, readAll, create } from '../components/Queue';


const HomeScreen = ({ navigation, queue }) => {
    const [name, setName] = useState('');
   
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
          onPress={() => {
            console.log(name)
            if (name == ''){
                alert("Please enter your name first.")
                return
            }
            if (queue.queue.includes(name)){
              alert("This name is already in the queue, try adding your last initial.")
              return
            }
            queue.enqueue(name)
            //alert("You have been added, " + name + ". Please wait to be assigned to the next free court.")
            setName('')
        }}
        />
        <Text>q:{queue.queue}</Text>
        
        
        
        
        
      </View>
      <View style={styles.footButton}>
      <Button title="See courts >"
        onPress={() => navigation.navigate("Courts")}
        />
      </View>
      </SafeAreaView>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      padding:10,
      width:"100%",
      marginTop:20,
      
    },
    footButton: {
        position:"absolute",
        right:10,
        bottom:10,
    }
  });
  

export default HomeScreen;