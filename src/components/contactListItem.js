import * as React from 'react';
import {TouchableOpacity, Text, View, Linking} from 'react-native';
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
