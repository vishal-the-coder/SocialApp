import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { COLOR } from '../Util/Color';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
  },
  text:{color:COLOR.DARK_GRAY}
});
