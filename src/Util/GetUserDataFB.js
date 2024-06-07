import firestore from '@react-native-firebase/firestore';
import {USERS} from './Constants';

const getUserData = async id => {
  const user = await firestore().collection(USERS).doc(id).get();
  return user._data;
};
export default getUserData;
