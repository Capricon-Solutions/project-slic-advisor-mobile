import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';

export default function Report({navigation}) {
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Report" onPress={() => navigation.goBack()} />
    </View>
  );
}
