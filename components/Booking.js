import {quartersInYear} from 'date-fns';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {height, width, scale} from '../config/globalStyles';

const Booking = props => {
  const [name, setName] = useState([]);
  const [pid, setPid] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const done = () => {
    props.navigation.pop();
  };
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require('../assets/images/studyroom.png')}
              style={styles.img}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.title}>{props.route.params.title}</Text>
              <View style={styles.textinfo}>
                <Text style={styles.text}>
                  개방 시간: {props.route.params.opentime}
                  :00 ~ {props.route.params.closetime}:00
                </Text>
                <Text style={styles.text}>
                  사용 가능 인원 : {props.route.params.minuser}-
                  {props.route.params.maxuser}명
                </Text>
                <Text style={styles.text}>이용 가능 시간 : 최대 2시간</Text>
                <Text style={styles.text}>예약시간 20분 경과시 이용 제한</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.inputtitle}>이용 시간</Text>
          <Text style={styles.usetime}>이용시간 고민해봅시다</Text>
          <Text style={styles.inputtitle}>동반 이용자</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={name}
              style={styles.nameinput}
              placeholder={'이름 입력'}
              placeholderTextColor={'#8f8f8f'}
              onChangeText={name => {
                setName(name);
              }}></TextInput>
            <TextInput
              value={pid}
              style={styles.nameinput}
              placeholder={'학번 입력'}
              placeholderTextColor={'#8f8f8f'}
              onChangeText={pid => {
                setPid(pid);
              }}></TextInput>
            <TouchableOpacity style={styles.checkbtn}>
              <Text style={styles.checkbtntext}>확인</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputtitle}>사용 목적(500자 이내)</Text>
          <TextInput
            value={purpose}
            style={styles.purpose}
            placeholder={'사용 목적을 입력하세요.'}
            placeholderTextColor={'#8f8f8f'}
            multiline={true}
            onChangeText={purpose => {
              setPurpose(purpose);
            }}></TextInput>
        </View>
        <View style={styles.donecontainer}>
          <TouchableOpacity style={styles.done} onPress={done}>
            <Text style={styles.donetext}>예약하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginRight: 18 * width,
    marginLeft: 18 * width,
  },
  card: {
    height: height * 155,
    borderBottomWidth: 0.8,
    borderColor: '#B4B4B4',
  },
  img: {
    height: 120 * height,
    width: 120 * width,
    borderRadius: 20 * scale,
  },
  content: {
    marginBottom: 16 * height,
    marginTop: 16 * height,
    flexDirection: 'row',
  },
  textcontainer: {
    marginLeft: 14 * width,
    marginTop: 10 * height,
  },
  text: {
    fontSize: 12 * scale,
    fontWeight: '400',
    lineHeight: 18 * height,
    letterSpacing: 0.6 * scale,
    color: '#4A4A4A',
  },
  title: {
    fontSize: 18 * scale,
    fontWeight: '600',
    lineHeight: 22 * height,
    letterSpacing: 0.6 * width,
  },
  inputcontainer: {},
  inputtitle: {
    marginBottom: 12 * height,
    marginTop: 12 * height,
    fontSize: 16 * scale,
  },
  inputtitle: {
    fontSize: 16 * scale,
    fontWeight: '600',
    lineHeight: 22 * height,
    marginBottom: 8 * height,
    marginTop: 20 * height,
  },
  usetime: {
    width: 335 * width,
    height: 42 * height,
    backgroundColor: '#ffeaea',
  },
  nameinput: {
    width: 130 * width,
    height: 34 * height,
    backgroundColor: '#ffeaea',
    borderRadius: 8 * scale,
    marginRight: 10 * width,
    padding: 6 * scale,
  },
  checkbtn: {
    width: 40 * width,
    height: 34 * height,
    backgroundColor: '#b71a30',
    borderRadius: 8 * scale,
    justifyContent: 'center',
    marginLeft: 12 * width,
  },
  checkbtntext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12 * scale,
    fontWeight: '600',
  },
  purpose: {
    height: 200 * height,
    backgroundColor: '#ffeaea',
    borderRadius: 8 * scale,
    marginRight: 10 * width,
    padding: 10 * scale,
  },
  donecontainer: {
    alignItems: 'center',
  },
  done: {
    height: 40 * height,
    width: 170 * width,
    backgroundColor: '#b71a30',
    justifyContent: 'center',
    borderRadius: 12 * scale,
    marginTop: 30 * height,
  },
  donetext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default Booking;
