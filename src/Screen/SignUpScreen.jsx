import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  getFcmToken,
  IMAGE,
  LOGIN_SCREEN,
  TOKENS,
  USERS,
} from '../Util/Constants';
import {COLOR} from '../Util/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {Auth} from '../Service';
import {userAction} from '../Store/UserSlice';
import { windowHeight } from '../Util/Dimension';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: Yup.string().min(6, 'Too Short!').required('Password is required'),
});

const SignUpScreen = ({navigation}) => {
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const token = await getFcmToken();
      setToken(token);
    };
    getToken();
  }, []);

  const createUserInDB = async (uid, name, email) => {
    const user = {
      uid: uid,
      userId: uuid.v4(),
      displayName: name.trim(),
      username: name.trim().toLowerCase().split(' ').join(''),
      phone: '',
      bio: '',
      avatarImage: '',
      email: email,
      token: token,
      following: [],
      followers: [],
    };
    try {
      await firestore()
        .collection(USERS)
        .doc(uid)
        .set(user)
        .then(console.log('User Added!'));
      await firestore()
        .collection(TOKENS)
        .add({token: token})
        .then(console.log('Token Added!'));
      console.log('sign up from signup screen ::: ', user);
      user && dispatch(userAction.addLoginUser(user));
    } catch (error) {
      console.log('Error while saving data to DB:: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        validationSchema={SignUpSchema}
        onSubmit={async values => {
          try {
            setLoader(true);
            const uid = await Auth.signUp(
              values.name,
              values.email,
              values.password,
              dispatch,
            );

            createUserInDB(uid, values.name, values.email);
          } catch (error) {
            setLoader(false);
            console.log('Error while login::', error);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {/* <View style={{marginHorizontal: 'auto', marginVertical: 10}}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                }}
                source={IMAGE.LOGO}
              />
            </View> */}
            <Text style={styles.titleText}>SIGN UP</Text>
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons name="person" size={24} color={COLOR.MAIN} />
                  )}
                  onPress={null}
                  disabled
                />
              }
              label="Name"
              mode="outlined"
              outlineColor={COLOR.MAIN}
              activeOutlineColor={COLOR.MAIN}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.input}
            />
            {errors.name && touched.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons name="email" size={24} color={COLOR.MAIN} />
                  )}
                  onPress={null}
                  disabled
                />
              }
              label="Email"
              mode="outlined"
              outlineColor={COLOR.MAIN}
              activeOutlineColor={COLOR.MAIN}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="password"
                      size={24}
                      color={COLOR.MAIN}
                    />
                  )}
                  onPress={null}
                  disabled
                />
              }
              label="Password"
              mode="outlined"
              secureTextEntry
              outlineColor={COLOR.MAIN}
              activeOutlineColor={COLOR.MAIN}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <Button
              mode="contained"
              onPress={handleSubmit}
              textColor={COLOR.MINT_GREEN}
              style={styles.button}>
              {loader ? (
                <ActivityIndicator color={COLOR.MINT_GREEN} size={'small'} />
              ) : (
                'Sign Up'
              )}
            </Button>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              <Text style={styles.haveAccountText}>
                Already have an Account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.replace(LOGIN_SCREEN)}>
                <Text style={{color: COLOR.MAIN, fontWeight: '900'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLOR.MINT_GREEN,
  },
  titleText: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: windowHeight / 20,
    color: COLOR.MAIN,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLOR.MAIN,
    marginTop: 16,
  },
  errorText: {
    color: COLOR.RED,
  },
  haveAccountText: {
    color: COLOR.DARK_GRAY,
  },
});
