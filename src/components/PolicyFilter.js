import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  View,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponentNoLabel from './DropdownComponentNoLabel';
import SquareTextBoxOutlined from './SquareTextBoxOutlined';
import AlertButtonWhite from './AlertButtonWhite';
import AlertButton from './AlertButton';
import Fonts from '../theme/Fonts';
import COLORS from '../theme/colors';
import SquareTextBoxOutlinedDate from './SquareTextBoxOutlinedDate';

const window = Dimensions.get('window');

export default function PolicyFilter({
  modalVisible,
  setModalVisible,
  Name,
  handlePolicyValuesChange,
  initialValues,
  onPressSearch,
  onPressClear,
}) {
  const [BusinessType, setSelectedBType] = React.useState(
    initialValues.SelectedBType || '',
  );
  const [isValid, setIsValid] = React.useState(!!BusinessType);
  React.useEffect(() => {
    setIsValid(!!BusinessType);
  }, [BusinessType]);
  const [status, setStatus] = React.useState(initialValues.Status || '');
  const [PolicyNumber, setPNumber] = React.useState(
    initialValues.PNumber || '',
  );
  const [VehicleNumber, setVNumber] = React.useState(
    initialValues.VNumber || '',
  );
  const [StartFromDt, setSDate] = React.useState(initialValues.SDate || '');
  const [StartToDt, setEDate] = React.useState(initialValues.EDate || '');
  const [MobileNumber, setMobile] = React.useState(initialValues.Mobile || '');
  const [NicNumber, setNic] = React.useState(initialValues.Nic || '');
  const [BusiRegNo, setBRegNo] = React.useState(initialValues.BRegNo || '');

  // Reset function to clear fields
  const clearFields = () => {
    setSelectedBType('');
    setStatus('');
    setPNumber('');
    setVNumber('');
    setSDate('');
    setEDate('');
    setMobile('');
    setNic('');
    setBRegNo('');
  };

  const handleSearch = () => {
    if (!BusinessType) {
      alert('Please select a Business Type.');
      return;
    }
    onPressSearch();
  };
  React.useEffect(() => {
    console.log('VehicleNumber', VehicleNumber);

    handlePolicyValuesChange({
      BusinessType,
      status,
      PolicyNumber,
      VehicleNumber,
      StartFromDt,
      StartToDt,
      MobileNumber,
      NicNumber,
      BusiRegNo,
    });
  }, [
    BusinessType,
    status,
    PolicyNumber,
    VehicleNumber,
    StartFromDt,
    StartToDt,
    MobileNumber,
    NicNumber,
    BusiRegNo,
  ]);

  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(backgroundOpacity, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  function hide() {
    if (modalVisible) {
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        setModalVisible(false);
      }, 300);
    } else {
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            backgroundColor: backgroundOpacity.interpolate({
              inputRange: [0, 0.2],
              outputRange: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.2)'],
            }),
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          style={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.modalTitle}>{Name}</Text>
            <TouchableOpacity
              onPress={() => hide()}
              style={{
                borderRadius: 100,
                padding: 2,
                height: 27,
                width: 27,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ccc',
              }}>
              <MaterialCommunityIcons name="close" color="#000" size={20} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginBottom: 5,
              marginTop: 5,
              fontSize: 12.5,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.ashBlue,
            }}>
            Business Type
          </Text>
          <DropdownComponentNoLabel
            BorderColor={COLORS.textColor}
            initialValue={BusinessType}
            placeholder="Select Business Type"
            onSelect={value => setSelectedBType(value)}
            dropdownData={[
              {label: 'All', value: 'A'},
              {label: 'Motor', value: 'M'},
              {label: 'Non-Motor', value: 'G'},
            ]}
          />
          <Text
            style={{
              marginBottom: 5,
              marginTop: 5,
              fontSize: 12.5,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.ashBlue,
            }}>
            Policy Status
          </Text>
          <DropdownComponentNoLabel
            BorderColor={COLORS.textColor}
            placeholder="Select Policy Status"
            onSelect={value => setStatus(value)}
            dropdownData={[
              {label: 'Premium Pending', value: 'P'},
              {label: 'Debit Outstanding', value: 'D'},
              {label: 'Claim Pending', value: 'C'},
              {label: 'Reminders Set Policies', value: 'F'},
            ]}
          />
          <SquareTextBoxOutlined
            Title={PolicyNumber}
            Label="Policy Number"
            setValue={text => setPNumber(text)}
          />
          <SquareTextBoxOutlined
            Title={VehicleNumber}
            Label="Vehicle Number"
            setValue={text => setVNumber(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlinedDate
                Title={StartFromDt}
                Label="Start Date"
                setValue={text => setSDate(text)}
                keyboardType="numeric"
              />
            </View>

            <Text style={{marginTop: 25}}>To</Text>
            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlinedDate
                Title={StartToDt}
                Label="End Date"
                setValue={text => setEDate(text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <SquareTextBoxOutlined
            Title={MobileNumber}
            Label="Mobile Number"
            keyboardType={'phone-pad'}
            setValue={text => setMobile(text)}
          />
          <SquareTextBoxOutlined
            Title={NicNumber}
            Label="NIC Number"
            setValue={text => setNic(text)}
          />
          <SquareTextBoxOutlined
            Title={BusiRegNo}
            Label="Business Reg. No"
            setValue={text => setBRegNo(text)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 5,
              gap: 10,
            }}>
            <AlertButtonWhite
              onPress={() => {
                clearFields(); // Clear all fields
                console.log('Fields cleared');
                onPressClear();
              }}
              Title="Clear"
            />
            <AlertButton onPress={handleSearch} Title="Search" />
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalTitle: {
    fontSize: 17,
    color: '#000',
  },
});
