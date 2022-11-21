import {NavigationContainer, StackActions} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Text} from 'react-native';
import AppStackNavi from './navigation/AppstackNavi';
import HomeScreen from './navigation/HomeScreen';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const App = () => {
  StatusBar.setBarStyle('dark-content');
  return (
    <NavigationContainer>
      <AppStackNavi />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
