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
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';

import axios from 'axios';
import Studyroomcard from '../components/Studyroomcard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, width, height} from '../config/globalStyles';
import Reservationstatus from '../components/Reservationstatus';
import {map} from 'react-native-cheerio/lib/api/traversing';
import {withRepeat} from 'react-native-reanimated';

const Reservation = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [test, setTest] = useState([]);
  const [load, setload] = useState(0);

  const checklist = async (id, password) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/checklist/${id}/${password}`,
      );
      setTest(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setload(1);
      console.log('success!');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checklist(props.id, props.password).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    onRefresh();
    checklist(props.id, props.password);
  }, []);

  return (
    <View style={styles.top}>
      <View style={[styles.box, styles.border, {borderRadius: 11}]}>
        <MaterialCommunityIcons
          name={'account-group-outline'}
          color={'#CD2719'}
          size={30 * scale}
        />
        <View>
          <Text
            style={{
              marginLeft: 13 * scale,
              fontSize: 16 * scale,
              color: '#B71A30',
            }}>
            {' '}
            스터디룸 예약 현황을 확인해보세요!
          </Text>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {test.map((data, index) => {
          return <Reservationstatus data={data} key={index} value={index} />;
        })}
      </ScrollView>
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
  top: {
    flex: 1,
  },
  box: {
    height: 56 * height,
    width: 342 * width,
    backgroundColor: '#FFFFFF',
    marginTop: 69 * height,
    marginLeft: 16 * scale,
    marginRight: 16 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  border: {
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'solid',
    justifyContent: 'center',
    borderColor: '#B71A30',
  },
});

export default Reservation;
