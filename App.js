import {NavigationContainer, StackActions} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import AppStackNavi from './navigation/AppstackNavi';
import HomeScreen from './navigation/HomeScreen';
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
