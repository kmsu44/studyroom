import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, Alert} from 'react-native';
import Datecontainer from '../components/Datecontainer';
import axios from 'axios';
const Home = props => {
  const [test, setTest] = useState([]);
  const getTable = async (id, password, roomId, bookingId) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/accompany/${id}/${password}/${roomId}/${bookingId}`,
      );
      setTest(response.data);
    } catch (error) {
      Alert.alert('오류', '서버오류');
    }
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView>
      {test.map((data, index) => {
        return (
          <Text key={index} value={index}>
            {data}
          </Text>
        );
      })}
    </SafeAreaView>
  );
};

export default Home;
