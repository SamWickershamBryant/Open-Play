import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableHighlight, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './app/screens/HomeScreen';
import CourtScreen from './app/screens/CourtScreen';

import { useQueue } from './app/components/Queue';

const Stack = createStackNavigator();

export default function App() {
  const onClick = () => {
    alert("You are gay")
  }

  const {queue, enqueue, dequeue} = useQueue()

  


  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} queue={{queue,enqueue,dequeue}}/>}
        </Stack.Screen>
        <Stack.Screen name="Courts">
          {props => <CourtScreen {...props} queue={{queue,enqueue,dequeue}}/>}
        </Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection:"row",
    
  },
});
