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
} from 'react-native';
import Studyroomcard from '../components/Studyroomcard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {scale, width, height} from '../config/globalStyles';
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
    <View style={styles.top}>
      <View style={[styles.box, styles.border, {borderRadius: 11}]}>
        <MaterialCommunityIcons
          name={'account-group-outline'}
          color={'#EA4F4F'}
          size={30}
        />
        <View>
          <Text style={{fontSize: 19, color: '#B71A30', width: 280}}>
            {' '}
            스터디룸 예약 현황을 확인해보세요!
          </Text>
        </View>
      </View>
      <View style={styles.status}>
        <View style={{height: 42}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>나의 예약 현황</Text>
        </View>
        <View style={{height: 300, flexDirection: 'row'}}>
          <View style={{width: 130}}>
            <Image
              source={require('../assets/images/studyroom.png')}
              style={{height: 139, width: 124}}></Image>
          </View>
          <View style={{width: 200}}>
            <View style={{marginLeft: 16}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                14 스터디룸(4층)
              </Text>
              <Text style={styles.list}>예약 날짜 : 10월 7일 금요일</Text>
              <Text style={styles.list}>예약 시간 : 15:00 ~ 17:00</Text>
              <Text style={styles.list}>사용 인원 수 : 4명</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 13,
                marginLeft: 16,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.cancel}>
                  <Text
                    style={{
                      color: '#CD2719',
                      fontSize: 11,
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
                      fontSize: 11,
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
    fontSize: 14 * scale,
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
    padding: 23 * scale,
    height: '25%',
    width: '90%',
    borderRadius: 16,
    marginTop: 29,
    marginLeft: '5%',
    marginRight: '5%',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  top: {
    flex: 1,
  },

  box: {
    height: '7%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginTop: '20%',
    marginLeft: '5%',
    marginRight: '5%',
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
