import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    throw error;
  }
};
export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    throw error;
  }
};
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key); 
  } catch (error) {
    throw error;
  }
};