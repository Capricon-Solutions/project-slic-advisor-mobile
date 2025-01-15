import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HeaderBackground from '../../components/HeaderBackground';
import Header from '../../components/Header';
import { Styles } from '../../theme/Styles';

export default function TrainingCalender({ navigation }) {
    return (
        <View style={Styles.container}>
            <HeaderBackground />
            <Header Title="Training Calender"
                onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
});
