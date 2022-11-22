import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Datecontainer from '../components/Datecontainer';
import axios from 'axios';
import {height, scale, width} from '../config/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RNRestart from 'react-native-restart';
const Info = props => {
  return (
    <SafeAreaView style={styles.main}>
      <View>
        <View style={styles.top}>
          <TouchableOpacity
            onPress={() => {
              // props.setisLoggedIn(false);
              // props.navigation.reset({routes: [{name: 'Login'}]});
              RNRestart.Restart();
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'exit-to-app'}
              color={'#B71A30'}
              size={26}
            />
            <Text style={styles.logout}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'loupe'}
              color={'#B71A30'}
              size={20}
            />
            <Text style={styles.title}>피드백</Text>
          </View>
          <View style={{marginTop: 12 * height, marginBottom: 12 * height}}>
            <Text style={styles.text}>
              문의사항 및 버그 관련 제보는 아래의 이메일 주소로 보내주세요!
            </Text>

            <Text style={styles.text}>📮 kmsu444@naver.com</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'loupe'}
              color={'#B71A30'}
              size={20}
            />
            <Text style={styles.title}>소개</Text>
          </View>
          <View style={{marginTop: 12 * height, marginBottom: 12 * height}}>
            <Text style={styles.semititle}>Development</Text>
            <View style={{marginLeft: 20 * scale}}>
              <Text style={styles.infotext}>🖥️ 김민수 18</Text>
              <Text style={styles.infotext}>🖥️ 유의진 20</Text>
              <Text style={styles.infotext}>✈️ 정한비 20</Text>
            </View>
            <Text style={styles.semititle}>Design</Text>
            <View style={{marginLeft: 20 * scale}}>
              <Text style={styles.infotext}>📖 박서영 19</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  top: {
    height: 85 * height,
    width: 335 * width,
    borderBottomWidth: 1.2 * scale,
    borderBottomColor: '#B4B4B4',
    justifyContent: 'center',
    alignContent: 'center',
  },
  logout: {
    fontSize: 22 * scale,
    fontFamily: 'Pretendard-SemiBold',
    marginLeft: 6 * width,
  },
  content: {
    flex: 1,
  },
  box: {
    width: 335 * width,
    borderBottomWidth: 1 * scale,
    borderBottomColor: '#D1D1D1',
    marginTop: 23 * height,
  },
  title: {
    fontSize: 20 * scale,
    fontFamily: 'Pretendard-SemiBold',
    marginLeft: 6 * scale,
  },
  text: {
    fontSize: 13 * scale,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 5 * scale,
  },
  semititle: {
    fontSize: 18 * scale,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 15 * scale,
  },
  infotext: {
    fontSize: 16 * scale,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 15 * scale,
  },
});

export default Info;
