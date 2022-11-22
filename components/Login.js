import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {height, width, scale} from '../config/globalStyles';
import axios from 'axios';

const Login = props => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const login = async (id, password) => {
    if (id == '') {
      Alert.alert('아이디를 입력하세요');
    } else if (password == '') {
      Alert.alert('비밀번호를 입력하세요');
    } else {
      try {
        let Data = {
          id: id,
          password: password,
        };
        const response = await axios.post(`http://52.79.223.149/login/`, Data);
        console.log(response.data);
        if (response.data.result === '1') {
          props.setId(id);
          props.setPassword(password);
          props.setisLoggedIn(true);
        } else {
          Alert.alert('학번과 비밀번호가 올바르지 않습니다.');
          setPassword('');
        }
      } catch (error) {
        Alert.alert('서버 오류');
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.info}>세종대학교 포털 계정으로 로그인</Text>
      <TextInput
        value={id}
        style={styles.input}
        placeholder={'아이디'}
        placeholderTextColor={'#8F8F8F'}
        keyboardType="number-pad"
        onChangeText={id => {
          setId(id);
        }}
        maxLength={8}
        bulrOnSubmit={false}></TextInput>

      <TextInput
        value={password}
        style={styles.input}
        placeholder={'비밀번호'}
        placeholderTextColor={'#8F8F8F'}
        returnKeyType={'default'}
        secureTextEntry={true}
        onChangeText={password => {
          setPassword(password);
        }}></TextInput>

      <TouchableOpacity style={styles.btn} onPress={() => login(id, password)}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontFamily: 'Pretendard-SemiBold',
          }}>
          Log In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150 * width,
    height: 150 * height,
  },
  info: {
    color: '#375066',
    marginTop: 20 * height,
    fontFamily: 'Pretendard-Medium',
  },
  input: {
    fontFamily: 'Pretendard-Medium',
    width: 319 * width,
    height: 48 * height,
    backgroundColor: '#ffeaea',
    borderRadius: 10 * scale,
    marginTop: 10 * width,
    padding: 13 * scale,
    color: '#375066',
  },
  btn: {
    width: 319 * width,
    height: 54 * height,
    backgroundColor: '#cd2719',
    borderRadius: 16,
    marginTop: 20 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
