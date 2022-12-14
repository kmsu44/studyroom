import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';

import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, width, height} from '../config/globalStyles';
import Reservationstatus from '../components/Reservationstatus';

const Reservation = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [test, setTest] = useState([]);
  const checklist = async (id, password) => {
    let data = {
      id: id,
      password: password,
    };
    try {
      const response = await axios.post(
        `https://jongidang.xyz/checklist/`,
        data,
      );
      setTest(response.data);
    } catch (error) {
      Alert.alert('서버오류');
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
  }, []);

  return (
    <SafeAreaView style={styles.top}>
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
              fontFamily: 'Pretendard-Medium',
            }}>
            스터디룸 예약 현황을 확인해보세요!
          </Text>
        </View>
      </View>
      <View style={styles.refresh}>
        {refreshing === false ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {test.map((data, index) => {
              return (
                <Reservationstatus
                  id={props.id}
                  password={props.password}
                  data={data}
                  key={index}
                  value={index}
                  onRefresh={onRefresh}
                />
              );
            })}
            {Object.keys(test).length === 0 ? (
              <View
                style={{
                  height: 573 * height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFEAEA',
                    width: 280 * width,
                    height: height * 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12 * scale,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Pretendard-Medium',
                      fontSize: 16,
                      letterSpacing: 0.6 * scale,
                    }}>
                    예약된 스터디룸이 없습니다.
                  </Text>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refresh: {
    height: 620 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    height: 56 * height,
    width: 342 * width,
    backgroundColor: '#FFFFFF',
    marginTop: 16 * height,
    marginBottom: 15 * height,
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
