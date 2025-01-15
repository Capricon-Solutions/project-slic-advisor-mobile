import * as React from 'react';
import { TouchableOpacity, Dimensions, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import COLORS from '../theme/colors';
import { Styles } from '../theme/Styles';
import Fonts from '../theme/Fonts';

// import { useSelector } from "react-redux";

export default function Header({ Title, onPress }) {
	return (
		<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 70, marginTop: 5 }}>

			<View style={{ justifyContent: 'center', flex: 0.2, }}>
				<TouchableOpacity onPress={onPress} style={{ height: 38, width: 38, borderRadius: 16, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', }}>
					<MaterialCommunityIcons name="chevron-left" color={COLORS.black} size={25} />
				</TouchableOpacity>
			</View>
			<View style={{ flex: 0.6, alignItems: 'center', }}>
				<Text style={{ fontFamily: Fonts.Roboto.Bold, fontSize: 17, color: COLORS.title }}>{Title}</Text>
			</View>
			<View style={{ flex: 0.2, backgroundColor: 'red' }}>
			</View>
		</View >


	);
}
