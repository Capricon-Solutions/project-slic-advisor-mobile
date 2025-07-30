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
import {showToast} from './ToastMessage';
import Toast from 'react-native-toast-message';
import moment from 'moment';

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
    initialValues.VNumber || 'AAA9999',
  );
  const [StartFromDt, setSDate] = React.useState(initialValues.SDate || '');
  const [StartToDt, setEDate] = React.useState(initialValues.EDate || '');
  const [MobileNumber, setMobile] = React.useState(initialValues.Mobile || '');
  const [NicNumber, setNic] = React.useState(initialValues.Nic || '');
  const [BusiRegNo, setBRegNo] = React.useState(initialValues.BRegNo || '');
  const [formError, setFormError] = React.useState({
    firstPart: '',
    secondPart: '',
  });

  const [VehicleNumberFrom, setVNumberFrom] = React.useState({
    firstPart: '',
    secondPart: '',
  });
  const [VehicleNumberTo, setVNumberTo] = React.useState(
    initialValues.VNumberTo || '',
  );
  const businessTypeRef = React.useRef();
  const policyStatusRef = React.useRef();

  const sDateRef = React.useRef();
  const eDateRef = React.useRef();
  // Reset function to clear fields
  const clearFields = () => {
    setSelectedBType('');
    businessTypeRef.current?.clear();
    policyStatusRef.current?.clear();
    setStatus('');
    setPNumber('');
    setVNumber('');
    setSDate('');
    setEDate('');
    setMobile('');
    setNic('');
    setBRegNo('');
    setVNumberFrom({
      firstPart: '',
      secondPart: '',
    });
  };

  React.useEffect(() => {
    7;
    const {firstPart, secondPart} = VehicleNumberFrom;
    const isValidFirstPart = firstPart;
    const isValidSecondPart = secondPart;

    if (isValidFirstPart || isValidSecondPart) {
      setVNumber(firstPart + secondPart);
    }
  }, [VehicleNumberFrom.firstPart, VehicleNumberFrom.secondPart]);

  console.log('VehicleNumber', VehicleNumber);

  const initial = initialValues?.VNumber || '';

  React.useEffect(() => {
    setVNumberFrom({
      firstPart:
        initial?.length == 6 ? initial?.slice(0, 2) : initial?.slice(0, 3),
      secondPart:
        initial?.length == 6 ? initial?.slice(2, 6) : initial?.slice(3),
    });
  }, [initial]);

  const handleSearch = () => {
    if (!BusinessType) {
      // alert('Please select a Business Type.');
      showToast({
        type: 'error',
        text1: 'Please select a Business Type.',
        // text2:
        //   'Storage permission is required to download and view the file.',
      });
      return;
    }

    if (StartFromDt || StartToDt) {
      if (!StartFromDt || !StartToDt) {
        // alert('Please select both Start Date and End Date.');
        showToast({
          type: 'error',
          text1: 'Please select both Start Date and End Date.',
        });
        return;
      }
      if (StartFromDt > StartToDt) {
        // alert('Start Date cannot be later than End Date.');
        showToast({
          type: 'error',
          text1: 'Start Date cannot be later than End Date.',
        });
        return;
      }
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
      supportedOrientations={['portrait', 'landscape-left', 'landscape-right']} // 🔑
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
            Business Type *
          </Text>
          <DropdownComponentNoLabel
            BorderColor={COLORS.textColor}
            search={false}
            ref={businessTypeRef}
            value={BusinessType}
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
            ref={policyStatusRef}
            search={false}
            value={status}
            placeholder="Select Policy Status"
            initialValue={status}
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
            maxLength={25}
            Label="Policy Number"
            value={PolicyNumber}
            setValue={text => setPNumber(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              width: '100%',
            }}>
            {/* <SquareTextBoxOutlined
              Title={VehicleNumber}
              maxLength={10}
              value={VehicleNumber}
              Label="Vehicle Number"
              setValue={text => setVNumber(text)}
            /> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlined
                Title={VehicleNumberFrom.firstPart}
                placeholder="XXX"
                maxLength={10}
                value={VehicleNumberFrom.firstPart}
                Label="Vehicle Number"
                setValue={text =>
                  setVNumberFrom({...VehicleNumberFrom, firstPart: text.replace(/\s/g, '') })
                }
              />
            </View>

            <Text style={{marginTop: 25}}>To</Text>

            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlined
                Title={VehicleNumberFrom.secondPart}
                maxLength={10}
                placeholder="9999"
                value={VehicleNumberFrom.secondPart}
                Label=" "
                setValue={text => {
                  setVNumberFrom({...VehicleNumberFrom, secondPart: text.replace(/\s/g, '') });
                }}
              />
            </View>
          </View>
          {formError.firstPart && (
            <Text style={{color: 'red', fontSize: 12}}>
              {formError.firstPart}
            </Text>
          )}
          {formError.secondPart && (
            <Text style={{color: 'red', fontSize: 12}}>
              {formError.secondPart}
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlinedDate
                // Title={StartFromDt}
                Label="Start Date"
                ref={sDateRef}
                maximumDate={
                  StartToDt
                    ? moment(StartToDt, 'YYYY/MM/DD').toDate()
                    : undefined
                }
                setValue={text => setSDate(text)}
                keyboardType="numeric"
                value={StartFromDt}
              />
            </View>

            <Text style={{marginTop: 25}}>To</Text>
            {/* <View style={{flex: 0.45}}>
              <SquareTextBoxOutlinedDate
                // Title={StartToDt}
                ref={eDateRef}
                Label="End Date"
                minimumDate={StartFromDt ? StartFromDt : null}
                setValue={text => setEDate(text)}
                keyboardType="numeric"
                value={StartToDt}
              />
            </View> */}

            <View style={{flex: 0.45}}>
              <SquareTextBoxOutlinedDate
                ref={eDateRef}
                Label="End Date"
                minimumDate={
                  StartFromDt
                    ? moment(StartFromDt, 'YYYY/MM/DD').toDate()
                    : undefined
                }
                setValue={text => setEDate(text)}
                keyboardType="numeric"
                value={StartToDt}
              />
            </View>
          </View>

          <SquareTextBoxOutlined
            Title={MobileNumber}
            Label="Mobile Number"
            keyboardType={'phone-pad'}
            maxLength={12}
            value={MobileNumber}
            setValue={text => setMobile(text)}
          />
          <SquareTextBoxOutlined
            Title={NicNumber}
            Label="NIC Number"
            maxLength={12}
            nic={true}
            value={NicNumber}
            setValue={text => setNic(text)}
          />
          <SquareTextBoxOutlined
            Title={BusiRegNo}
            Label="Business Reg. No"
            value={BusiRegNo}
            maxLength={12}
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
      <Toast visibilityTime={2000} />
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
