import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {height, width, scale} from '../config/globalStyles';

const Timeblock = props => {
  if (props.time == props.info) {
    return <View style={styles.on}></View>;
  } else {
    return <View style={styles.off}></View>;
  }
};
const styles = StyleSheet.create({
  on: {
    backgroundColor: '#44D600',
    height: 6 * height,
    width: 28 * width,
    borderLeftWidth: 1,
    borderColor: 'white',
  },
  off: {
    backgroundColor: '#E2E2E2',
    height: 6 * height,
    width: 28 * width,
    borderLeftWidth: 1,
    borderColor: 'white',
  },
});
export default Timeblock;
