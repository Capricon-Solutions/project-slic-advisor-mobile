import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import {Styles} from '../../../theme/Styles';

export default function TrainingCalender({navigation}) {
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Training Calender" onPress={() => navigation.goBack()} />
    </View>
  );
}
