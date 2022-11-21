import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  TextInput,
  Alert,
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
import axios from 'axios';
import {scale, width, height} from '../config/globalStyles';
import Modal from 'react-native-modal';
import {prop} from 'react-native-cheerio/lib/api/attributes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Reservationstatus = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const day_type = {
    0: '월요일',
    1: '화요일',
    2: '수요일',
    3: '목요일',
    4: '금요일',
    5: '토요일',
    6: '일요일',
  };
  const [cancelMsg, setCancelMsg] = useState('');
  const [accompany, setAccompany] = useState([]);
  const Remove = async (id, password, cancelMsg, bookingId) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/Remove/${id}/${password}/${cancelMsg}/${bookingId}`,
      );
      if (response.data.result === '취소 완료') {
        Alert.alert('취소 완료');
        toggleModal();
        props.onRefresh();
      }
    } catch (error) {
      Alert.alert('서버오류');
    }
  };
  const cancel = (id, password, cancelMsg, bookingId) => {
    if (cancelMsg === '') {
      Alert.alert('취소 사유를 입력하세요.');
      setCancelMsg('');
    } else {
      Remove(id, password, cancelMsg, bookingId);
      setCancelMsg('');
    }
  };
  const getaccompany = async (id, password, bookingId) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/accompany/${id}/${password}/${bookingId}`,
      );
      setAccompany(response.data);
    } catch (error) {
      Alert.alert('서버오류');
    }
  };
  useEffect(() => {
    getaccompany(props.id, props.password, props.data.bookingId);
  }, []);
  return (
    <View style={styles.status}>
      <View
        style={{
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
                fontFamily: 'Pretendard-SemiBold',
                marginBottom: 5 * height,
              }}>
              {props.data.title}
            </Text>
            <Text style={styles.list}>
              예약 날짜 : {props.data.month}월 {props.data.datee}일{' '}
              {day_type[props.data.day]}
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
            <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
              <Modal isVisible={isModalVisible} backdropColor={'white'}>
                <View style={styles.modalcontain}>
                  <View style={styles.modal}>
                    <View style={styles.quit}>
                      <Text style={styles.modaltext}>동반 이용자</Text>
                      <TouchableOpacity onPress={toggleModal}>
                        <MaterialCommunityIcons
                          name="close"
                          color={'black'}
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <View style={styles.accompanycontain}>
                        {accompany.map((data, idx) => {
                          return (
                            <Text key={idx} style={styles.accompany}>
                              {data}
                            </Text>
                          );
                        })}
                      </View>
                    </View>

                    <Text style={styles.modaltext}>취소 사유</Text>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        value={cancelMsg}
                        style={styles.input}
                        placeholder={'취소 사유를 입력하세요.'}
                        placeholderTextColor={'#8f8f8f'}
                        multiline={true}
                        blurOnSubmit={true}
                        onChangeText={cancelMsg => {
                          setCancelMsg(cancelMsg);
                        }}></TextInput>
                      <TouchableOpacity
                        style={styles.modalbtn}
                        onPress={() => {
                          cancel(
                            props.id,
                            props.password,
                            cancelMsg,
                            props.data.bookingId,
                          );
                        }}>
                        <Text style={styles.btntext}>예약 취소</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View style={styles.cancel}>
                <Text
                  style={{
                    color: '#CD2719',
                    fontSize: 10 * scale,
                    fontFamily: 'Pretendard-SemiBold',
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
                    fontFamily: 'Pretendard-SemiBold',
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
    fontFamily: 'Pretendard-Medium',
    letterSpacing: 0.6,
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
    width: 342 * width,
    borderRadius: 16,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 16 * scale,
    marginRight: 16 * scale,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
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
  modal: {
    width: 350 * width,
    backgroundColor: '#FFFFFF',
    padding: 15 * scale,
    borderRadius: 10 * scale,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalcontain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFEAEA',
    borderRadius: 12,
    width: 300 * width,
    height: 100 * height,
    margin: 10 * scale,
    padding: 10 * scale,
    paddingTop: 10 * scale,
  },
  modaltext: {
    fontSize: 16 * scale,
    fontFamily: 'Pretendard-SemiBold',
  },
  modalbtn: {
    fontSize: 16 * scale,
    fontFamily: 'Pretendard-SemiBold',
    backgroundColor: '#CD2719',
    borderRadius: 12,
    width: 180 * width,
    height: 38 * height,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20 & scale,
  },
  btntext: {
    color: '#fff',
    fontSize: 16 * scale,
    fontFamily: 'Pretendard-SemiBold',
    letterSpacing: 0.6,
  },
  inputcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  accompany: {
    fontSize: 12 * scale,
    fontFamily: 'Pretendard-SemiBold',
    margin: 2 * scale,
    letterSpacing: 1 * scale,
  },
  accompanycontain: {
    backgroundColor: '#FFEAEA',
    borderRadius: 12 * scale,
    marginTop: 10 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5 * scale,
    marginBottom: 10 * scale,
    width: 300 * width,
  },
  quit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Reservationstatus;
