import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Styles } from '../../theme/Styles';
import HeaderBackground from '../../components/HeaderBackground';
import Header from '../../components/Header';

export default function Badvisor({ navigation }) {
    return (
        <View style={Styles.container}>
            <HeaderBackground />
            <Header Title="Contacts"
                onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eef2f3',
    },
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
