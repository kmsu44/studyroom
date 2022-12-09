import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Studyroomcard from '../components/Studyroomcard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import axios from 'axios';
import {getDate, getMonth, getDay, getYear, format, addDays} from 'date-fns';
import Datecontainer from '../components/Datecontainer';
import {height, scale, width} from '../config/globalStyles';
const List = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [studyroom, setStudyroom] = useState([]);
  const getTable = async (year, month, mode) => {
    setRefreshing(true);
    let data = {
      year: year,
      month: month,
      mode: mode,
    };
    try {
      const response = await axios.post(`https://jongidang.xyz/Table/`, data);
      setStudyroom(response.data);
    } catch (error) {
      Alert.alert('서버오류');
    }
    setRefreshing(false);
  };

  const onRefresh = React.useCallback(newdate => {
    let year = getYear(newdate);
    let month = getMonth(newdate);
    if (month == 12) {
      month = 0;
      year += 1;
    }
    getTable(year, month, 'N');
    countroom = 0;
  }, []);
  useEffect(() => {
    onRefresh(date);
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const getWeekDays = date => {
    const start = date;
    const weekOfLength = 8;
    const final = [];
    for (let i = 0; i < weekOfLength; i++) {
      const date = addDays(start, i);
      final.push({
        formatted: format(date, 'EEE'),
        date: date,
        datee: getDate(date),
        day: getDay(date),
        month: getMonth(date),
      });
    }
    return final;
  };
  const day_type = {
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일',
    0: '일요일',
  };
  const [starthour, setStarthour] = useState(10);
  const [endhour, setEndhour] = useState(22);
  const [number, setNumber] = useState(3);
  const [limit, setLimit] = useState(false);
  let countroom = 0;
  const search = data => {
    // 사용자 인원 제한
    if (data.minuser > number || number > data.maxuser) {
      return false;
    }
    if (data.roomId === 33) {
      today = new Date();
      todaydate = today.getDate();
      selectdate = date.getDate();
      if (todaydate != selectdate) {
        return false;
      }
    }
    if (data.roomId === 48 || data.roomId === 49 || data.roomId === 47) {
      today = new Date();
      todaydate = today.getDate();
      selectdate = date.getDate();
      if (todaydate + 1 != selectdate && todaydate + 2 != selectdate) {
        return false;
      }
    }
    let cnt = 0;
    data.timetable[getDate(date) - 1].map((timedata, index) => {
      hour = index + 10;
      let start = starthour;
      let end = endhour;
      let close;
      if (getDay(date) === 6) {
        close = 16;
      }
      if (start <= hour && hour < end && hour < close) {
        if (timedata == hour) {
          if (data.roomId === 24) {
            console.log(timedata, hour);
          }

          cnt += 1;
        }
      }
    });
    if (cnt != 0) {
      countroom += 1;
      return true;
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.timelist}>
        {getYear(date)}년 {getMonth(date) + 1}월 {getDate(date)}일{' '}
        {day_type[getDay(date)]}
      </Text>
      <View style={styles.box}>
        <TouchableOpacity style={styles.btn} onPress={toggleModal}>
          <Modal isVisible={isModalVisible} backdropColor={'white'}>
            <View style={styles.modal}>
              <Datecontainer
                date={date}
                setDate={setDate}
                toggleModal={toggleModal}
                starthour={starthour}
                setStarthour={setStarthour}
                endhour={endhour}
                setEndhour={setEndhour}
                number={number}
                setNumber={setNumber}
                limit={limit}
                setLimit={setLimit}
                week={week}
                onRefresh={onRefresh}
              />
            </View>
          </Modal>
          <MaterialCommunityIcons name={'tune'} color={'#EA4F4F'} size={30} />
          <Text style={styles.hourlist}>
            {starthour}:00 ~ {endhour}:00 ({endhour - starthour}시간){' '}
            <MaterialCommunityIcons
              name={'account'}
              color={'black'}
              size={15}
            />{' '}
            {number}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.refresh}>
        {refreshing === true ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <ScrollView
            style={styles.container}
            indicatorStyle={'black'}
            refreshControl={
              <RefreshControl
                progressViewOffset={1}
                refreshing={refreshing}
                onRefresh={() => {
                  onRefresh(date);
                }}
              />
            }>
            {studyroom.map((data, index) => {
              if (search(data)) {
                return (
                  <Studyroomcard
                    data={data}
                    date={getDate(date)}
                    key={index.toString()}
                    value={index}
                    navigation={props.navigation}
                    starthour={starthour}
                    endhour={endhour}
                    today={date}
                    id={props.id}
                    password={props.password}
                    day={getDay(date)}
                  />
                );
              }
            })}
            {countroom === 0 ? (
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
                    예약 가능한 스터디룸이 없습니다.
                  </Text>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  refresh: {
    height: 620 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginBottom: 50 * height,
  },
  timelist: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    letterSpacing: 0.6 * scale,
    textAlign: 'center',
    marginTop: 16 * height,
    lineHeight: 22,
  },
  hourlist: {
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    letterSpacing: 0.6 * scale,
    marginLeft: 12 * width,
    marginRight: 12 * width,
  },
  textbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 335 * width,
    height: 48 * height,
    backgroundColor: '#FFEAEA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8 * scale,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10 * height,
    marginTop: 10 * height,
    flexDirection: 'row',
    marginLeft: 16 * width,
    marginRight: 16 * width,
  },
  modal: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default List;
