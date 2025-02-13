import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function ContactListItem({item}) {
  const [visible, setVisible] = React.useState(false);

  const handleCall = phoneNumber => {
    // Open the phone dialer with the contact number
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL).catch(err =>
      console.error('Failed to make a call:', err),
    );
  };

  return (
    <View style={Styles.contactlistWrap}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 55,
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {/* <Octicons name="search" color={COLORS.primary} size={20} /> */}
            <MaterialCommunityIcons
              name="office-building"
              color={COLORS.primary}
              size={20}
            />
          </View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.black,
              marginLeft: 10,
            }}>
            {item.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Octicons
            name={visible == true ? 'chevron-up' : 'chevron-down'}
            color={COLORS.black}
            size={20}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {visible && (
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.white,
            paddingBottom: 5,
            paddingTop: 0,
          }}>
          {/* Details Section */}
          <View style={Styles.itemcontentBorder}>
            <Text style={Styles.itemcontentTitile}>Details</Text>
            <Text style={Styles.itemcontentdata}>{item.region} Province</Text>
            <Text style={Styles.itemcontentdata}>{item.address}</Text>
            <Text style={Styles.itemcontentdata}>{item.email}</Text>
          </View>

          {/* General Line Section */}
          <View style={Styles.itemcontentBorder}>
            <Text style={Styles.itemcontentTitile}>General Line</Text>
            {item.contactNo1 && (
              <TouchableOpacity
                onPress={() => handleCall(item.contactNo1)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Foundation
                  name="telephone"
                  style={{transform: [{rotate: '100deg'}]}}
                  color={COLORS.subtext}
                  size={18}
                />
                <Text style={Styles.itemcontactdata}> {item.contactNo1}</Text>
              </TouchableOpacity>
            )}

            {item.contactNo2 && (
              <TouchableOpacity
                onPress={() => handleCall(item.contactNo2)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Foundation
                  name="telephone"
                  style={{transform: [{rotate: '100deg'}]}}
                  color={COLORS.subtext}
                  size={18}
                />
                <Text style={Styles.itemcontactdata}> {item.contactNo2}</Text>
              </TouchableOpacity>
            )}

            {item.contactNo3 && (
              <TouchableOpacity
                onPress={() => handleCall(item.contactNo3)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Foundation
                  name="telephone"
                  style={{transform: [{rotate: '100deg'}]}}
                  color={COLORS.subtext}
                  size={18}
                />
                <Text style={Styles.itemcontactdata}> {item.contactNo3}</Text>
              </TouchableOpacity>
            )}
            {item.contactNo4 && (
              <TouchableOpacity
                onPress={() => handleCall(item.contactNo4)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Foundation
                  name="telephone"
                  style={{transform: [{rotate: '100deg'}]}}
                  color={COLORS.subtext}
                  size={18}
                />
                <Text style={Styles.itemcontactdata}> {item.contactNo4}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Regional Sales Manager Section */}

          {Boolean(item.managerGenMobile) && Boolean(item.rsmGenMobile) && (
            <View style={Styles.itemcontentBorder}>
              <Text style={Styles.itemcontentTitile}>
                Regional Sales Manager - General
              </Text>
              {item.managerGenMobile && (
                <TouchableOpacity
                  onPress={() => handleCall(item.managerGenMobile)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Foundation
                    name="telephone"
                    style={{transform: [{rotate: '100deg'}]}}
                    color={COLORS.subtext}
                    size={18}
                  />
                  <Text style={Styles.itemcontactdata}>
                    {item.managerGenMobile}
                  </Text>
                </TouchableOpacity>
              )}
              {item.rsmGenMobile && (
                <TouchableOpacity
                  onPress={() => handleCall(item.rsmGenMobile)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Foundation
                    name="telephone"
                    style={{transform: [{rotate: '100deg'}]}}
                    color={COLORS.subtext}
                    size={18}
                  />
                  <Text style={Styles.itemcontactdata}>
                    {item.rsmGenMobile}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {item.adminMobile && (
            <View style={Styles.itemcontentBorder}>
              <Text style={Styles.itemcontentTitile}>Admin</Text>
              <TouchableOpacity
                onPress={() => handleCall(item.adminMobile)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Foundation
                  name="telephone"
                  style={{transform: [{rotate: '100deg'}]}}
                  color={COLORS.subtext}
                  size={18}
                />
                <Text style={Styles.itemcontactdata}>{item.adminMobile}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// gadge

{
  /* <View style={{
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
				</View> */
}
