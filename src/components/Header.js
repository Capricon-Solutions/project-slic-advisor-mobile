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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import SmallButton from './SmallButton';
import {Menu, Divider} from 'react-native-paper';
import PDF from '../icons/pdf.png';
const window = Dimensions.get('window');

export default function Header({
  Title,
  onPress,
  ButtonTitle,
  haveButton,
  onFilterPress,
  onButton,
  haveFilters,
  haveMenu,
  haveDownload,
  downloadItems,
  menuItems,
  haveCall,
  haveWhatsapp,
  whatsappNo,
  callNo,
  titleFontSize,
  havePdf,
  onPDF,
  disabledButton,
  disabledColor,
}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const openDMenu = () => setVisible(true);

  const closeDMenu = () => setVisible(false);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: window.height * 0.09,
        marginTop: 5,
        marginHorizontal: 20,
      }}>
      <View style={{justifyContent: 'center', flex: 0.25}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: window.width * 0.095,
            width: window.width * 0.095,
            borderRadius: 13,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={COLORS.black}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.5, alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.Bold,
            textAlign: 'center',
            fontSize: titleFontSize ? titleFontSize : 16,
            color: COLORS.title,
          }}>
          {Title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {haveButton && (
          <View style={{width: '100%'}}>
            <SmallButton
              disabledButton={disabledButton}
              disabledColor={disabledColor}
              Title={ButtonTitle}
              onPress={onButton}></SmallButton>
          </View>
        )}

        {haveFilters && (
          <View>
            <TouchableOpacity
              onPress={onFilterPress}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons name="search" color={COLORS.white} size={18} />
            </TouchableOpacity>
          </View>
        )}

        {haveCall && (
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${callNo}`).catch(err =>
                  console.error('Failed to make a call:', err),
                )
              }
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                marginHorizontal: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="phone-outline"
                color={COLORS.white}
                size={18}
              />
            </TouchableOpacity>
          </View>
        )}

        {haveWhatsapp && (
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=Hello&phone=${whatsappNo}`,
                )
              }
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                marginHorizontal: 2,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="whatsapp"
                color={COLORS.white}
                size={18}
              />
            </TouchableOpacity>
          </View>
        )}
        {havePdf && (
          <View>
            <TouchableOpacity onPress={onPDF}>
              <Image style={{height: 25, width: 25}} source={PDF}></Image>
            </TouchableOpacity>
          </View>
        )}
        {haveMenu && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={{marginLeft: 5}}>
                <View style={{}}>
                  <MaterialIcons
                    name="more-vert"
                    color={COLORS.black}
                    size={27}
                  />
                </View>
              </TouchableOpacity>
            }>
            {menuItems?.map((item, index) => (
              <React.Fragment key={index}>
                <Menu.Item
                  onPress={() => {
                    item.onPress();
                    closeMenu();
                  }}
                  title={item.title}
                />
                {index !== menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Menu>
        )}
        {haveDownload && (
          <Menu
            visible={visible}
            onDismiss={closeDMenu}
            anchor={
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  onPress={openDMenu}
                  style={{
                    backgroundColor: COLORS.primaryGreen,
                    borderRadius: 6,
                    width: '100%',
                    height: 32,
                    fontFamily: Fonts.Roboto.Bold,
                    justifyContent: 'center',
                    marginVertical: 3,
                    alignItems: 'center',
                    paddingLeft: 6,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: window.width * 0.03,
                      fontFamily: Fonts.Roboto.SemiBold,
                    }}>
                    {'Download'}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    color={COLORS.white}
                    size={23}
                  />
                </TouchableOpacity>
              </View>
            }>
            {downloadItems?.map((item, index) => (
              <React.Fragment key={index}>
                <Menu.Item
                  onPress={() => {
                    item.onPress();
                    closeDMenu();
                  }}
                  title={item.title}
                />
                {index !== downloadItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Menu>
        )}
      </View>
    </View>
  );
}
