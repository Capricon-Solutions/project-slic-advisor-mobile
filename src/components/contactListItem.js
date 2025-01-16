import * as React from 'react';
import { TouchableOpacity, Dimensions, Text, View, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import { Styles } from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function ContactListItem({ item }) {

	const [visible, setVisible] = React.useState(false)

	return (
		<View

			style={Styles.contactlistWrap}>
			<TouchableOpacity
				onPress={() => setVisible(!visible)}
				style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 55, width: '100%' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View>
						{/* <Octicons name="search" color={COLORS.primary} size={20} /> */}
						<MaterialCommunityIcons name="office-building" color={COLORS.primary} size={20} />

					</View>
					<Text style={{ fontFamily: Fonts.Roboto.Medium, color: COLORS.black, marginLeft: 10 }}>{item.name}</Text>
				</View>
				<TouchableOpacity onPress={() => setVisible(!visible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Octicons name={visible == true ? "chevron-up" : "chevron-down"} color={COLORS.black} size={20} />

				</TouchableOpacity>
			</TouchableOpacity>

			{visible &&
				<View style={{
					width: '100%',
					backgroundColor: COLORS.white,
					paddingBottom: 5,
					paddingTop: 0,
				}}>
					{/* Details Section */}
					<View style={Styles.itemcontentBorder}>
						<Text style={Styles.itemcontentTitile}>Details</Text>
						<Text style={Styles.itemcontentdata}>Eastern Province</Text>
						<Text style={Styles.itemcontentdata}>No.143, Main Street, Akkaraipattu - 02</Text>
						<Text style={Styles.itemcontentdata}>akkaraipattu@srilankainsurance.com</Text>
					</View>

					{/* General Line Section */}
					<View style={Styles.itemcontentBorder}>
						<Text style={Styles.itemcontentTitile}>General Line</Text>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10,
						}}>
							<Foundation name="telephone" style={{ transform: [{ rotate: "100deg" }] }} color={COLORS.subtext} size={18} />
							<Text style={Styles.itemcontentdata}>  011 235 7435</Text>
						</View>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
							<Foundation name="telephone" style={{ transform: [{ rotate: "100deg" }] }} color={COLORS.subtext} size={18} />
							<Text style={Styles.itemcontentdata}>  011 235 7435</Text>
						</View>
					</View>

					{/* Regional Sales Manager Section */}
					<View style={Styles.itemcontentBorder}>
						<Text style={Styles.itemcontentTitile}>Regional Sales Manager - General</Text>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10,
						}}>
							<Foundation name="telephone" style={{ transform: [{ rotate: "100deg" }] }} color={COLORS.subtext} size={18} />
							<Text style={Styles.itemcontentdata}>  011 235 7435</Text>
						</View>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
							<Foundation name="telephone" style={{ transform: [{ rotate: "100deg" }] }} color={COLORS.subtext} size={18} />
							<Text style={Styles.itemcontentdata}>  011 235 7435</Text>
						</View>
					</View>
				</View>
			}

		</View>


	);
}


// gadge


{/* <View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 10,
					width: '100%',
				}}>
					<View style={{ alignItems: 'center', flex: 1 }}>
						<View style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							borderWidth: 10,
							borderColor: COLORS.primary,
							justifyContent: 'center',
							alignItems: 'center',
							position: 'relative',
						}}>
							<Text style={{
								fontFamily: Fonts.Roboto.Bold,
								fontSize: 24,
								color: COLORS.black,
							}}>550</Text>
							<Text style={{
								fontFamily: Fonts.Roboto.Regular,
								fontSize: 12,
								color: COLORS.black,
							}}>Island Rank</Text>
						</View>
						<Text style={{
							fontFamily: Fonts.Roboto.Regular,
							fontSize: 12,
							color: COLORS.black,
							marginTop: 8,
						}}>995</Text>
					</View>

					<View style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'space-evenly',
					}}>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 20,
						}}>
							<View style={{
								width: 50,
								height: 50,
								borderRadius: 25,
								borderWidth: 8,
								borderColor: COLORS.primary,
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 10,
							}}>
								<Text style={{
									fontFamily: Fonts.Roboto.Bold,
									fontSize: 12,
									color: COLORS.black,
								}}>30/60</Text>
							</View>
							<Text style={{
								fontFamily: Fonts.Roboto.Regular,
								fontSize: 12,
								color: COLORS.black,
							}}>Regional Rank</Text>
						</View>

						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
							<View style={{
								width: 50,
								height: 50,
								borderRadius: 25,
								borderWidth: 8,
								borderColor: COLORS.primary,
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 10,
							}}>
								<Text style={{
									fontFamily: Fonts.Roboto.Bold,
									fontSize: 12,
									color: COLORS.black,
								}}>02/10</Text>
							</View>
							<Text style={{
								fontFamily: Fonts.Roboto.Regular,
								fontSize: 12,
								color: COLORS.black,
							}}>Branch Rank</Text>
						</View>
					</View>
				</View> */}