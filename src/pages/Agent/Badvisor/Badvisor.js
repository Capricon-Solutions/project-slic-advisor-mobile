import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Getpath } from '../../../redux/services/NavControllerSlice';

export default function Badvisor({ navigation }) {
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(Getpath(0));

        }, [])
    );
    return (
        <View style={Styles.container}>
            <HeaderBackground />
            <Header Title="B-Advisor"
                onPress={() => navigation.goBack()} />
        </View>
    );
}


