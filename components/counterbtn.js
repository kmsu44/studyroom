import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Counter = props => {
  return (
    <View style={styles.numbercontainer}>
      <TouchableOpacity onPress={() => set}>
        <MaterialCommunityIcons name="minus" color={'black'} size={16} />
      </TouchableOpacity>
      <Text style={styles.number}>{number}명</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons name="plus" color={'black'} size={16} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Counter;
