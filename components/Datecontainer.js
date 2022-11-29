import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {height, width, scale} from '../config/globalStyles';
import {getDate, getMonth} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@miblanchard/react-native-slider';

const Datecontainer = props => {
  const [starthour, setStarthour] = useState(props.starthour);
  const [endhour, setEndhour] = useState(props.endhour);
  const [number, setNumber] = useState(props.number);
  const [limit, setLimit] = useState(props.limit);
  const [Choice_date, setChoicedate] = useState(props.date);

  const decreasenumber = () => {
    if (number > 2) {
      setNumber(prevnumber => prevnumber - 1);
    }
  };
  const increasenumber = () => {
    setNumber(prevnumber => prevnumber + 1);
  };
  const decreasetime = () => {
    if (starthour >= 11) {
      setStarthour(prevstarthour => prevstarthour - 1);
    }
  };
  const increasetime = () => {
    if (starthour < 21 && starthour < endhour - 1) {
      setStarthour(prevstarthour => prevstarthour + 1);
    }
  };
  const decreaseendtime = () => {
    if (endhour > 11 && endhour - 1 > starthour) {
      setEndhour(prevEndhour => prevEndhour - 1);
    }
  };
  const increaseendtime = () => {
    if (endhour <= 21) {
      setEndhour(prevEndhour => prevEndhour + 1);
    }
  };
  const Limitswitch = () => {
    setLimit(!limit);
    if (limit === false) {
      setValue([10, 22]);
    } else {
      setValue([10, 22]);
    }
  };

  useEffect(() => {
    setChoicedate(props.date);
  }, []);
  const quit = () => {
    props.toggleModal();
    if (Choice_date === '') return;
    props.setDate(Choice_date);
    if (getMonth(Choice_date) != getMonth(props.date)) {
      props.onRefresh(Choice_date);
    }
    props.setEndhour(value[1]);
    props.setStarthour(value[0]);
    props.setLimit(limit);
    props.setNumber(number);
  };
  const day_type = {
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
    0: '일',
  };
  const [value, setValue] = useState([props.starthour, props.endhour]);
  const timelist = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>날짜</Text>
      <View style={styles.week}>
        {props.week.map((weekDay, index) => {
          const daybox = [styles.day];
          const daytext = [styles.daytext];
          if (getDate(Choice_date) === weekDay.datee) {
            daybox.push(styles.selectedday);
            daytext.push(styles.selectedtext);
          } else if (weekDay.day === 0) {
            daytext.push(styles.sundaytext);
          } else if (weekDay.day === 6) {
            daytext.push(styles.saturdaytext);
          } else {
            daybox.push(styles.day);
            daytext.push(styles.dayText);
          }
          return (
            <TouchableOpacity
              style={daybox}
              key={weekDay.date}
              onPress={() => setChoicedate(weekDay.date)}>
              <Text style={daytext}>{day_type[weekDay.day]}</Text>
              <Text style={daytext}>{weekDay.datee}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.limit}>
        <Text style={styles.title}>시간</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={{
              width: 30 * width,
              height: 30 * height,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Limitswitch()}>
            <MaterialCommunityIcons
              name={
                limit === false ? 'circle-outline' : 'checkbox-marked-circle'
              }
              color={'black'}
              size={18}
            />
          </TouchableOpacity>
          <Text style={styles.limittext}>시간 제한 해제</Text>
        </View>
      </View>
      {limit === false ? (
        <Slider
          value={value}
          minimumValue={10}
          maximumValue={21}
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="#FFA0A0"
          thumbTintColor="#FF5656"
          trackMarks={[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
          renderTrackMarkComponent={index => {
            return <View style={styles.trackmarks}></View>;
          }}
          step={1}
          thumbTouchSize={{
            width: 35,
            height: 35,
          }}
          trackClickable={true}
          onValueChange={value => setValue(value)}
        />
      ) : (
        <Slider
          value={[10, 21]}
          minimumValue={10}
          maximumValue={21}
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="#d3d3d3"
          disabled={'false'}
        />
      )}

      <View style={styles.timeinfo}>
        {timelist.map((data, index) => {
          let style = styles.timeinfostyle;
          return (
            <View key={index} style={{}}>
              <Text style={style}>{data}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.title}>인원 수</Text>
      <View style={styles.numbercontainer}>
        <TouchableOpacity style={styles.btn2} onPress={() => decreasenumber()}>
          <MaterialCommunityIcons
            name="minus-circle-outline"
            color={'black'}
            size={16}
          />
        </TouchableOpacity>
        <Text style={styles.number}>{number}명</Text>
        <TouchableOpacity style={styles.btn2} onPress={() => increasenumber()}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={'black'}
            size={16}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.btn} onPress={() => quit()}>
          <Text style={styles.btntext}>조건 설정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 12,
    width: width * 345,

    padding: 20 * scale,
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
  week: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 17,
  },
  selectedday: {
    width: 32 * width,
    height: 60 * height,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA0A0',
  },
  day: {
    width: 32 * width,
    height: 60 * height,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedtext: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 5 * height,
    marginBottom: 5 * height,
  },
  daytext: {
    color: '#6C6C6C',
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 5 * height,
    marginBottom: 5 * height,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 22,
    letterSpacing: 0.6,
  },
  numbercontainer: {
    flexDirection: 'row',
  },
  saturdaytext: {
    color: '#0076DD',
  },
  sundaytext: {
    color: '#CD2719',
  },
  numbercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  number: {
    fontSize: 12 * scale,
    fontFamily: 'Pretendard-SemiBold',
    color: '#FF5656',
    letterSpacing: 0.6,
    lineHeight: 22,
    marginRight: 8 * width,
    marginLeft: 8 * width,
  },
  timecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26 * height,
  },
  time: {
    color: '#FF5656',
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    marginLeft: 6 * width,
    marginRight: 6 * width,
    letterSpacing: 0.6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timebox: {
    backgroundColor: '#FFEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120 * width,
    height: 60 * height,
    borderRadius: 8,
  },
  timetitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    letterSpacing: 0.6,
    lineHeight: 22,
  },
  clock: {
    marginRight: 18 * width,
    marginLeft: 18 * width,
  },
  btncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 23,
  },
  btn: {
    width: width * 200,
    height: height * 40,
    backgroundColor: '#CD2719',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.6,
    lineHeight: 22,
  },
  limit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13 * height,
  },
  limittext: {
    fontSize: 14 * scale,
    fontFamily: 'Pretendard-Medium',
    color: '#353535',
    letterSpacing: 0.6 * scale,
    lineHeight: 22 * scale,
  },
  btn2: {
    width: 30 * width,
    height: 30 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeinfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20 * height,
    marginTop: -5 * height,
  },
  trackmarks: {
    width: 1.5 * width,
    opacity: 0.7,
    height: 8 * height,
    backgroundColor: 'white',
    marginLeft: 10 * width,
  },
  timeinfostyle: {
    color: '#6C6C6C',
    fontSize: 8 * scale,
    fontFamily: 'Pretendard-SemiBold',
  },
  _timeinfostyle: {
    fontSize: 11 * scale,
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
});
export default Datecontainer;
