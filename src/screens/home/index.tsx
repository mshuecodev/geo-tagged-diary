import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        View Maps
      </Button>
    </View>
  );
};

export default HomeScreen;
