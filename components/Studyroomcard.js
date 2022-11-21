import {roundToNearestMinutesWithOptions} from 'date-fns/fp';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {height, width, scale} from '../config/globalStyles';
import Timeblock from './Timeblock';
import Booking from './Booking';
const time = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
function Studyroomcard(props) {
  let closetime = props.data.closetime;
  //토요일 개방시간
  if (props.day === 6) {
    closetime = 16;
  }
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/studyroom.png')}
          style={styles.img}
        />
        <View style={styles.textcontainer}>
          <View>
            <Text style={styles.title}>{props.data.name}</Text>
            <Text style={styles.text}>
              개방 시간: {props.data.opentime}:00 ~ {closetime}:00
            </Text>
            <Text style={styles.text}>
              사용 가능 인원 : {props.data.minuser}-{props.data.maxuser}명
            </Text>
            <Text style={styles.text}>이용 가능 시간 : 최대 2시간</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TouchableOpacity
              style={styles.reservation}
              onPress={() =>
                props.navigation.push('Booking', {
                  screen: 'List',
                  navigation: props.navigation,
                  data: props.data,
                  id: props.id,
                  password: props.password,
                  today: props.today,
                })
              }>
              {/* <Booking /> */}
              <Text style={styles.reservationtext}>예약</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bar}>
        {time.map((data, index) => {
          let timestyle = styles.time;
          //짝수시간만 표시
          if (data % 2 != 0) {
            timestyle = styles.whitetime;
          }
          let infovalue = props.data.timetable[props.date - 1][index];
          // 주말일경우 4시까지
          if (props.day === 6 && index > 5) {
            infovalue = ' ';
          }
          return (
            <View key={index} value={index}>
              <Timeblock time={data} info={infovalue} />
              <Text style={timestyle}>{data}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    height: height * 200,
    width: 335 * width,
    borderTopWidth: 0.8,
    borderColor: '#D1D1D1',
    marginRight: 19.5 * width,
    marginLeft: 19.5 * width,
  },
  img: {
    height: 120 * height,
    width: 120 * width,
    borderRadius: 20 * scale,
  },
  content: {
    marginBottom: 16 * height,
    marginTop: 16 * height,
    marginRight: 16 * width,
    marginLeft: 16 * width,
    flexDirection: 'row',
  },
  bar: {
    flexDirection: 'row',
    height: height * 25,
    marginRight: 15 * width,
    marginLeft: 15 * width,
  },
  textcontainer: {
    flex: 1,
    marginLeft: 16 * width,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 10 * scale,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 14 * height,
    letterSpacing: 1.4 * scale,
    color: '#4A4A4A',
  },
  title: {
    fontSize: 12.4 * scale,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 22 * height,
    letterSpacing: 0.6 * scale,
  },
  time: {
    fontSize: 8,
    fontFamily: 'Pretendard-SemiBold',
    letterSpacing: 0.6,
    marginLeft: -4 * scale,
    marginTop: 2 * scale,
  },
  whitetime: {
    fontSize: 8,
    fontFamily: 'Pretendard-Regular',
    letterSpacing: 0.6,
    color: 'white',
  },
  end: {
    textAlign: 'right',
    fontSize: 8 * scale,
    fontFamily: 'Pretendard-Regular',
    letterSpacing: 0.6 * scale,
  },
  reservation: {
    backgroundColor: '#FFEAEA',
    width: width * 66,
    height: height * 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8 * scale,
  },
  reservationtext: {
    fontSize: 12 * scale,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 22 * height,
    letterSpacing: 2 * scale,
  },
});
export default Studyroomcard;
