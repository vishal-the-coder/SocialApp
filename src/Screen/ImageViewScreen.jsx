import React, {useState} from 'react';
import {View, Button, Text, StatusBar} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import {COLOR} from '../Util/Color';

const ImageViewScreen = ({route, navigation}) => {
  const [visible, setVisible] = useState(true);
  const {item} = route.params;

  return (
    <View style={{}}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={COLOR.BLACK}
      />
      {/* <Text style={{fontSize: 18, marginBottom: 10, color:COLOR.WHITE}}>{item.displayName}</Text> */}
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginVertical: 10,
          color: COLOR.WHITE,
        }}>
        {item.displayName}
      </Text>
      <ImageViewing
        images={[{uri: item.image}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ImageViewScreen;
