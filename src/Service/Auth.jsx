import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {userAction} from '../Store/UserSlice';

const signUp = async (fullname, email, password, dispatch) => {
  if (!fullname || !email || !password) {
    Alert.alert('Error', 'Name, Email and password are required', [
      {text: 'OK'},
    ]);
    return;
  } else {
    return await auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(cred => {
        const {uid} = cred.user;
        auth().currentUser.updateProfile({
          displayName: fullname,
        });
        dispatch(userAction.addLoginUser({uid: uid, displayName: fullname}));
        return uid;
      })
      .catch(err => {
        Alert.alert('Error', `Code: ${err.code}\nMessage: ${err.message}`, [
          {text: 'OK'},
        ]);
      });
  }
};

const signIn = async (email, password, dispatch) => {
  if (!email || !password) {
    Alert.alert('Error', 'Email and password are required', [{text: 'OK'}]);
    return;
  }

  await auth()
    .signInWithEmailAndPassword(email.trim(), password)
    .then(() => {
      const currentUser = auth().currentUser;
      dispatch(
        userAction.addLoginUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
        }),
      );
    })
    .catch(err => {
      Alert.alert('Error', `Code: ${err.code}\nMessage: ${err.message}`, [
        {text: 'OK'},
      ]);
    });
};
const signOut = async dispatch => {
  const result = await auth().signOut();
  dispatch(userAction.removeLoginUser());
  console.log('Signed Out!!');
  return result;
};

const Auth = {signIn, signOut, signUp};
export default Auth;
