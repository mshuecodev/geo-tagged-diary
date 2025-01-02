import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Button} from 'react-native-paper';

// Define type for navigation props
interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    console.log('running home here!');
  }, []);

  return (
    <View style={styles.container}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          console.log('Pressed');
          navigation.navigate('MapDetail');
        }}>
        TES BUTTON
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default HomeScreen;
