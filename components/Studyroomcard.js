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
import Modal from 'react-native-modal';
function Studyroomcard(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
              {props.data.time}개방 시간: {props.data.opentime}:00 ~{' '}
              {props.data.closetime}:00
            </Text>
            <Text style={styles.text}>
              사용 가능 인원 : {props.data.minuser}-{props.data.maxuser}명
            </Text>
            <Text style={styles.text}>이용 가능 시간 : 최대 2시간</Text>
          </View>
          <TouchableOpacity style={styles.reservation} onPress={toggleModal}>
            {/* <Modal isVisible={isModalVisible} backdropColor={'white'}>

            </Modal> */}
            <Text style={styles.reservationtext}>예약 가능</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bar}>
        <View>
          <Timeblock
            time={'10'}
            info={props.data.timetable[props.date - 1][0]}
          />
          <Text style={styles.time}>10</Text>
        </View>
        <View>
          <Timeblock
            time={'11'}
            info={props.data.timetable[props.date - 1][1]}
          />
        </View>
        <View>
          <Timeblock
            time={'12'}
            info={props.data.timetable[props.date - 1][2]}
          />
          <Text style={styles.time}>12</Text>
        </View>
        <View>
          <Timeblock
            time={'13'}
            info={props.data.timetable[props.date - 1][3]}
          />
        </View>
        <View>
          <Timeblock
            time={'14'}
            info={props.data.timetable[props.date - 1][4]}
          />
          <Text style={styles.time}>14</Text>
        </View>
        <View>
          <Timeblock
            time={'15'}
            info={props.data.timetable[props.date - 1][5]}
          />
        </View>
        <View>
          <Timeblock
            time={'16'}
            info={props.data.timetable[props.date - 1][6]}
          />
          <Text style={styles.time}>16</Text>
        </View>
        <View>
          <Timeblock
            time={'17'}
            info={props.data.timetable[props.date - 1][7]}
          />
        </View>
        <View>
          <Timeblock
            time={'18'}
            info={props.data.timetable[props.date - 1][8]}
          />
          <Text style={styles.time}>18</Text>
        </View>
        <View>
          <Timeblock
            time={'19'}
            info={props.data.timetable[props.date - 1][9]}
          />
        </View>
        <View>
          <Timeblock
            time={'20'}
            info={props.data.timetable[props.date - 1][10]}
          />
          <View style={styles.row}>
            <Text style={styles.time}>20</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    height: height * 190,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
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
    marginLeft: 16 * width,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 10 * scale,
    fontWeight: '400',
    lineHeight: 14 * height,
    letterSpacing: 1.4 * scale,
    color: '#4A4A4A',
  },
  title: {
    fontSize: 14 * scale,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.6,
  },
  time: {
    fontSize: 8,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  end: {
    textAlign: 'right',
    fontSize: 8,
    fontWeight: '400',
    letterSpacing: 0.6,
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
    fontWeight: '600',
    lineHeight: 22 * height,
  },
  modal: {
    height: 300 * height,
    width: 300 * width,
    backgroundColor: 'black',
  },
});
export default Studyroomcard;
