import {add, quartersInYear, setHours} from 'date-fns';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  LogBox,
} from 'react-native';
import {height, width, scale} from '../config/globalStyles';
import axios from 'axios';
import {getDate, getMonth, getYear} from 'date-fns';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Booking = props => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [sid, setSid] = useState();
  const [purpose, setPurpose] = useState();
  const [ipid, setIpid] = useState();
  const [timelist, setTimelist] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [startHour, setStartHour] = useState('');
  const hoursList = [1, 2];
  const [hours, Sethours] = useState(1);
  const done = async (id, password) => {
    let data = {
      year: getYear(props.route.params.today),
      month: getMonth(props.route.params.today) + 1,
      day: getDate(props.route.params.today),
      startHour: startHour,
      closeTime: 20,
      hours: hours,
      purpose: purpose,
      mode: 'INSERT',
      idx: props.route.params.data.maxuser,
      ipid: ipid,
      roomId: props.route.params.data.roomId,
    };

    users.map((tmp, index) => {
      result = 'ipid' + (index + 1);
      data[result] = tmp.ipid;
    });
    console.log(data);
    try {
      const response = await axios.post(
        `http://52.79.223.149/Reservation/${id}/${password}`,
        data,
      );
      let result = response.data.result;

      if (result.includes('예약 완료')) {
        Alert.alert(result);
        props.route.params.navigation.pop();
      } else {
        Alert.alert(result);
      }
    } catch (error) {
      Alert.alert('서버 오류');
    }
  };
  const getIpid = async (id, password) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/Ipid/${id}/${password}`,
      );
      setIpid(response.data);
    } catch (error) {
      Alert.alert('서버 오류');
    }
  };
  const getBooktime = async (roomId, year, month, day) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/booktime/${roomId}/${year}/${month}/${day}`,
      );
      setTimelist(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('서버오류');
    }
  };
  const UserFind = async (id, password, sid, name, year, month, datee) => {
    try {
      const response = await axios.get(
        `http://52.79.223.149/UserFind/${id}/${password}/${sid}/${name}/${year}/${month}/${datee}`,
      );
      let result = response.data;
      // 정상 작동
      if (result == "id':'1") {
        Alert.alert('오류', '이용자가 없습니다.');
      } else if (result == "id':'3") {
        Alert.alert('본인의 학번으로는 신청할 수 없습니다.');
      } else if (result == "id':'6") {
        Alert.alert('이미 스터디룸에 예약된 사람입니다.');
      } else {
        const newuser = [...users];
        newuser.push({sid: sid, name: name, ipid: result});
        setUsers(newuser);

        // }
      }
    } catch (error) {
      Alert.alert('서버오류');
    }
  };
  const minus = sid => {
    setUsers(users.filter(user => user.sid !== sid));
  };

  const add = (id, password, today, maxuser) => {
    let flag = 0;
    if (Object.keys(users).length == maxuser - 1) {
      Alert.alert('오류', '최대 사용 인원을 초과하였습니다.');
    } else {
      users.map(data => {
        if (data.sid == sid) {
          flag = 1;
        }
      });
      if (flag == 1) {
        Alert.alert('이미 추가한 이용자입니다.');
      } else {
        UserFind(
          id,
          password,
          sid,
          name,
          getYear(today),
          getMonth(today) + 1,
          getDate(today),
        );
      }
    }
    setSid('');
    setName('');
  };
  useEffect(() => {
    getBooktime(
      props.route.params.data.roomId,
      getYear(props.route.params.today),
      getMonth(props.route.params.today) + 1,
      getDate(props.route.params.today),
    );
    getIpid(props.route.params.id, props.route.params.password);
  }, []);

  return (
    <ScrollView style={styles.main} indicatorStyle={'black'}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Image
              source={require('../assets/images/studyroom.png')}
              style={styles.img}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.title}>{props.route.params.data.name}</Text>
              <View style={styles.textinfo}>
                <Text style={styles.text}>
                  개방 시간: {props.route.params.data.opentime}
                  :00 ~ {props.route.params.data.closetime}:00
                </Text>
                <Text style={styles.text}>
                  사용 가능 인원 : {props.route.params.data.minuser}-
                  {props.route.params.data.maxuser}명
                </Text>
                <Text style={styles.text}>이용 가능 시간 : 최대 2시간</Text>
                <Text style={styles.text}>예약시간 20분 경과시 이용 제한</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.inputtitle}>시작 시간</Text>
          <View style={styles.starttimecontainer}>
            {timelist.length > 0 ? (
              timelist.map((data, index) => {
                let box = styles.startbtn;
                let text = styles.startbtn_text;
                if (data === startHour) {
                  box = styles._startbtn;
                  text = styles._startbtn_text;
                }
                return (
                  <TouchableOpacity
                    style={box}
                    value={index}
                    key={index}
                    onPress={() => setStartHour(data)}>
                    <Text style={text}>{data > 12 ? data - 12 : data}:00</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>로딩중...</Text>
            )}
          </View>
          <Text style={styles.inputtitle}>이용 시간</Text>
          <View style={styles.starttimecontainer}>
            {hoursList.map((data, index) => {
              let box = styles.startbtn;
              let text = styles.startbtn_text;
              if (data === hours) {
                box = styles._startbtn;
                text = styles._startbtn_text;
              }
              return (
                <TouchableOpacity
                  style={box}
                  value={index}
                  key={index}
                  onPress={() => Sethours(data)}>
                  <Text style={text}>{data}시간</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.inputtitle}>동반 이용자</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TextInput
              value={sid}
              style={styles.nameinput}
              placeholder={'학번 입력'}
              placeholderTextColor={'#8f8f8f'}
              onChangeText={sid => {
                setSid(sid);
              }}></TextInput>
            <TextInput
              value={name}
              style={styles.nameinput}
              placeholder={'이름 입력'}
              placeholderTextColor={'#8f8f8f'}
              onChangeText={name => {
                setName(name);
              }}></TextInput>
            <TouchableOpacity
              style={styles.checkbtn}
              onPress={() => {
                add(
                  props.route.params.id,
                  props.route.params.password,
                  props.route.params.today,
                  props.route.params.data.maxuser,
                );
              }}>
              <Text style={styles.checkbtntext}>추가</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usercontainer}>
            {users.map((data, idx) => {
              return (
                <View style={styles.usercard} key={idx} value={idx}>
                  <Text style={styles.usertext}>{data.sid}</Text>
                  <Text style={styles.usertext}>{data.name}</Text>

                  <TouchableOpacity
                    style={styles.minusbtn}
                    onPress={() => {
                      minus(data.sid);
                    }}>
                    <MaterialCommunityIcons
                      name="close-circle"
                      color={'black'}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <Text style={styles.inputtitle}>사용 목적(500자 이내)</Text>
          <TextInput
            value={purpose}
            style={styles.purpose}
            placeholder={'사용 목적을 입력하세요.'}
            placeholderTextColor={'#8f8f8f'}
            multiline={true}
            onChangeText={purpose => {
              if (purpose.length < 500) {
                setPurpose(purpose);
              }
            }}></TextInput>
        </View>
        <View style={styles.donecontainer}>
          <TouchableOpacity
            style={styles.done}
            onPress={() =>
              done(props.route.params.id, props.route.params.password)
            }>
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
    width: 135 * width,
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
    marginLeft: 2 * width,
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
    marginBottom: 30 * height,
  },
  donetext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  usercontainer: {
    width: 335 * width,
    marginTop: 10 * height,
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  usercard: {
    width: 160 * width,
    height: 30 * height,
    flexDirection: 'row',
    marginTop: 5 * height,
    marginRight: 5 * width,
    backgroundColor: '#ECECEC',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8 * scale,
  },
  usertext: {
    textAlign: 'center',
    lineHeight: 20 * scale,
  },
  minusbtn: {
    marginLeft: 5 * scale,
  },
  starttimecontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  startbtn: {
    width: 105 * width,
    height: 30 * height,
    backgroundColor: '#ECECEC',
    margin: 3 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8 * scale,
  },
  _startbtn: {
    width: 105 * width,
    height: 30 * height,
    backgroundColor: '#FFA0A0',
    margin: 3 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8 * scale,
  },
  startbtn_text: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: 1,
  },
  _startbtn_text: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
export default Booking;
