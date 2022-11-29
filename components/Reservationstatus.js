import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import axios from 'axios';
import {scale, width, height} from '../config/globalStyles';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImgPath} from './ImgPath';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
const Reservationstatus = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
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
    let data = {
      id: id,
      password: password,
      cancelMsg: cancelMsg,
      bookingId: bookingId,
    };
    try {
      const response = await axios.post(`https://jongidang.xyz/Remove/`, data);
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
    let data = {
      id: id,
      password: password,
      bookingId: bookingId,
    };
    try {
      const response = await axios.post(
        `https://jongidang.xyz/accompany`,
        data,
      );
      setAccompany(response.data);
    } catch (error) {
      Alert.alert('서버오류');
    }
  };
  const onCapture = uri => {
    ref.current.capture().then(uri => {
      onShare(uri);
    });
  };

  const onShare = async uri => {
    const result = await Share.open({
      url: Platform.OS === 'ios' ? `file://${uri}` : uri,
    }).catch(err => {});
  };
  const ref = useRef();
  useEffect(() => {
    getaccompany(props.id, props.password, props.data.bookingId);
  }, []);
  const number = Number(props.data.number) + 1;
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
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image
            source={ImgPath[props.data.roomId]}
            style={{
              height: 130 * height,
              width: 130 * width,
              borderRadius: 16 * scale,
            }}></Image>
        </View>
        <View style={{width: 169 * width}}>
          <View style={{marginLeft: 8 * width, marginTop: 8 * height}}>
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
            <Text style={styles.list}>사용 인원 수 : {number}명</Text>
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
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
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

            <TouchableOpacity activeOpacity={0.5} onPress={toggleModal2}>
              <Modal
                isVisible={isModalVisible2}
                backdropColor={'white'}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modal2}>
                  <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={toggleModal2}
                      style={{
                        marginRight: 10 * scale,
                        marginTop: 10 * scale,
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={'black'}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 280 * width,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ViewShot
                      ref={ref}
                      options={{
                        fileName: 'share',
                        format: 'jpg',
                        quality: 0.9,
                      }}>
                      <View
                        style={{
                          width: 200 * scale,
                          height: 200 * scale,
                          margin: 10 * scale,
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <Image
                            source={ImgPath[props.data.roomId]}
                            style={{
                              height: 120 * height,
                              width: 120 * width,
                              borderRadius: 16 * scale,
                            }}></Image>
                        </View>
                        <Text
                          style={{
                            fontSize: 16 * scale,
                            fontFamily: 'Pretendard-SemiBold',
                            marginBottom: 5 * height,
                            textAlign: 'center',
                            marginTop: 10 * height,
                          }}>
                          {props.data.title}
                        </Text>
                        <Text style={styles.sharetext}>
                          {props.data.month}월 {props.data.datee}일{' '}
                          {day_type[props.data.day]}
                        </Text>
                        <Text style={styles.sharetext}>
                          {props.data.starttime}:00 ~ {props.data.endtime}:00
                        </Text>
                      </View>
                    </ViewShot>
                  </View>

                  <TouchableOpacity onPress={onCapture} style={styles.sharebtn}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Pretendard-SemiBold',
                      }}>
                      예약 현황 공유하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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
    backgroundColor: '#B71A30',
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
    width: 310 * width,
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
    fontSize: 11 * scale,
    fontFamily: 'Pretendard-SemiBold',
    margin: 2 * scale,
    letterSpacing: 1 * scale,
  },
  accompanycontain: {
    backgroundColor: '#FFEAEA',
    borderRadius: 12 * scale,
    marginTop: 10 * scale,
    justifyContent: 'center',
    padding: 5 * scale,
    marginBottom: 10 * scale,
    width: 310 * width,
  },
  quit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sharetext: {
    color: '#B71A30',
    textAlign: 'center',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18 * scale,
  },
  modal2: {
    width: 280 * width,
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#fff',
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
  sharebtn: {
    backgroundColor: '#FFEAEA',
    height: 50 * height,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Reservationstatus;
