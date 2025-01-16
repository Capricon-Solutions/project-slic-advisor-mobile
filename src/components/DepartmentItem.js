import * as React from 'react';
import { TouchableOpacity, Dimensions, Text, View, Image, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import { Styles } from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function DepartmentItem({ item }) {

	const handleCall = (phoneNumber) => {
		// Open the phone dialer with the contact number
		const phoneURL = `tel:${phoneNumber}`;
		Linking.openURL(phoneURL).catch((err) =>
			console.error('Failed to make a call:', err)
		);
	};


	return (
		<View style={Styles.departmentListWrap}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, width: '100%', paddingVertical: 20, paddingLeft: 10 }}>

				<View style={{ marginLeft: 5, justifyContent: 'space-evenly', flex: 1, height: '100%' }}>
					<Text style={{ fontFamily: Fonts.Roboto.Medium, color: COLORS.black, fontSize: 14 }}>{item.name}</Text>
					<Text style={{ fontFamily: Fonts.Roboto.Regular, color: COLORS.ashBlue, fontSize: 12 }}>{item.department}</Text>
					<Text style={{ fontFamily: Fonts.Roboto.Regular, color: COLORS.ashBlue, fontSize: 12 }}>Contact Number - {item.contact}</Text>
				</View>
				<TouchableOpacity onPress={() => handleCall(item.contact)} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: COLORS.lightBorder, padding: 7 }}>
					<MaterialCommunityIcons name="phone-outline" style={{}} color={COLORS.primaryGreen} size={24} />
				</TouchableOpacity>
			</View>
		</View>


	);
}
