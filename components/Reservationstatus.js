import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  onPress,
  onShare,
} from 'react-native';
import {
  getDate,
  startOfWeek,
  getMonth,
  getDay,
  getYear,
  format,
  addDays,
} from 'date-fns';
import KakaoShareLink from 'react-native-kakao-share-link';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {scale, width, height} from '../config/globalStyles';
import {he} from 'date-fns/locale';

const Reservationstatus = props => {
  const day_type = {
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일',
    0: '일요일',
  };
  const Remove = async (id, password, roomId, cancelMsg, bookingId) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/Remove/${id}/${password}/${roomId}/${cancelMsg}/${bookingId}`,
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

  return (
    <View style={styles.status}>
      <View
        style={{
          //height: 309 * height,
          width: 139 * width,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 139 * width,
          }}>
          <Image
            source={require('../assets/images/studyroom2.png')}
            style={{height: 139 * height, width: 124 * width}}></Image>
        </View>
        <View style={{width: 169 * width}}>
          <View style={{marginLeft: 8 * scale, marginTop: 8 * height}}>
            <Text
              style={{
                fontSize: 16 * scale,
                fontWeight: 'bold',
                marginBottom: 5 * height,
              }}>
              {props.data.title}
            </Text>
            <Text style={styles.list}>
              예약 날짜 : {props.data.month}월 {props.data.datee}일{' '}
              {day_type[props.data.day + 1]}
            </Text>
            <Text style={styles.list}>
              예약 시간 : {props.data.starttime}:00 ~ {props.data.endtime}:00
            </Text>
            <Text style={styles.list}>
              사용 인원 수 : {props.data.number}명
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15 * height,
              marginLeft: 8 * scale,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity activeOpacity={0.5}>
              <View style={styles.cancel}>
                <Text
                  style={{
                    color: '#CD2719',
                    fontSize: 10 * scale,
                    fontWeight: 'bold',
                  }}>
                  예약 취소하기
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <View style={styles.share}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 10 * scale,
                    fontWeight: 'bold',
                  }}>
                  공유하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  list: {
    fontSize: 12 * scale,
    marginTop: 5 * height,
  },
  share: {
    backgroundColor: '#CD2719',
    height: 26 * height,
    width: 55 * width,
    borderRadius: 8 * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    width: 78 * width,
    height: 26 * height,
    borderColor: '#CD2719',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    backgroundColor: 'white',
    padding: 16 * scale,
    //height: 167 * height,
    width: 342 * width,
    borderRadius: 16,
    marginTop: 29 * scale,
    marginLeft: 16 * scale,
    marginRight: 16 * scale,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
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

export default Reservationstatus;
