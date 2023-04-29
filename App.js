import 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView } from 'react-native-safe-area-context';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './app/screens/HomeScreen';
import CourtScreen from './app/screens/CourtScreen';

import { useQueue } from './app/components/Queue';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  

  const {queue, enqueue, dequeue, exitQueue} = useQueue()

  
  

  return (
    
      <NavigationContainer>
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
      >
        <Tab.Screen name="Home"
          children = {props => <HomeScreen {...props} queue={{queue,enqueue,dequeue,exitQueue}}/>}
          >
        </Tab.Screen>
        <Tab.Screen name="Courts"
          children = {props => <CourtScreen {...props} queue={{queue,enqueue,dequeue}}/>}
          >
        </Tab.Screen>
      </Tab.Navigator>
      </SafeAreaView>
      </SafeAreaProvider>
      </NavigationContainer>
      
      
    
  );
}


