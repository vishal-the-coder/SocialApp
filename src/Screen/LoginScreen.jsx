// screens/LoginScreen.js
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Auth} from '../Service';
import {COLOR} from '../Util/Color';
import {IMAGE, SIGNUP_SCREEN} from '../Util/Constants';
import {screenHeight, screenWidth, windowHeight} from '../Util/Dimension';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string().min(6, 'Too Short!').required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          try {
            setLoader(true);
            Auth.signIn(values.email, values.password, dispatch);
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
            <Text style={styles.titleText}>LOGIN</Text>
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
                'Login'
              )}
            </Button>
            {/* <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Button mode="contained" style={styles.socialButton}>
                FB
              </Button>
              <Button mode="contained" style={styles.socialButton}>
                GOOGLE
              </Button>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              <TouchableOpacity style={styles.haveAccountText}>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              <Text style={styles.haveAccountText}>
                Don't have an Account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.replace(SIGNUP_SCREEN)}>
                <Text style={{color: COLOR.MAIN, fontWeight: '900'}}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

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
  socialButton: {
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

export default LoginScreen;
