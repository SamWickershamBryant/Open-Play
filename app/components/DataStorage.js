import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      //console.log(error);
    }
  };

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      //console.log(value)
      if (value !== null) {
        return JSON.parse(value);
      }
      
    } catch (error) {
     // console.log(error);
    }
  };