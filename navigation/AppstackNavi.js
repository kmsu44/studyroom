import React, {useEffect, useState} from 'react';

import HomeScreen from './HomeScreen';
import Login from '../components/Login';
import Booking from '../components/Booking';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
const Stack = createNativeStackNavigator();
const AppStackNavi = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Stack.Navigator>
      {isLoggedIn ? null : (
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          children={({navigation}) => (
            <Login
              navigation={navigation}
              setisLoggedIn={setisLoggedIn}
              setId={setId}
              setPassword={setPassword}
            />
          )}
        />
      )}
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        children={({navigation}) => (
          <HomeScreen
            navigation={navigation}
            id={id}
            password={password}
            setisLoggedIn={setisLoggedIn}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavi;
