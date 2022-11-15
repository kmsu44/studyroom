import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Studyroomcard from '../components/Studyroomcard';
import axios from 'axios';
const Reservation = props => {
  const [test, setTest] = useState([]);
  const [load, setload] = useState(0);
  const checklist = async (id, password) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/checklist/${id}/${password}`,
      );
      setTest(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setload(1);
      console.log('끝');
    }
  };

  useEffect(() => {
    checklist(props.id, props.password);
  }, []);
  return (
    <View style={styles.container}>
      <Text></Text>
      {load === 1 ? (
        test.map((data, index) => {
          return (
            <Text key={index.toString()} value={index}>
              {data.title}
              {data.starttime}시 ~ {data.endtime}시
            </Text>
          );
        })
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Reservation;
