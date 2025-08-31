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
import {validateSriLankanNIC} from '../utils/nicValidation';

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
  const [formError, setFormError] = React.useState({});

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

    setFormError({
      VehicleNumber: '',
      mobile: '',
      nic: '',
    });
  };

  const today = new Date();

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
    // console.log('VehicleNumber', VehicleNumber);

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
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: Platform.OS === 'ios' ? window.height*0.1 : 0}}
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
            Business Type{' '}
            <Text
              style={{
                marginBottom: 5,
                marginTop: 5,
                fontSize: 12.5,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.errorBorder,
              }}>
              *
            </Text>
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
            setValue={text => {
              const cleanedText = text;
              setPNumber(cleanedText);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              width: '100%',
            }}>
            <SquareTextBoxOutlined
              Title={VehicleNumber}
              maxLength={10}
              value={VehicleNumber}
              Label="Vehicle Number"
              setValue={text => {
                // Allow only letters, numbers and space (but do not trim)
                // const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, '');
                const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, '');

                setVNumber(cleaned);

                // Check for leading or trailing space
                const hasLeadingOrTrailingSpace = /^\s|\s$/.test(cleaned);

                // Check if exactly one space is present
                const spaceCount = (cleaned.match(/ /g) || []).length;

                // Check if at least one number exists
                const hasNumber = /[0-9]/.test(cleaned);

                // Count consecutive letters (excluding spaces and numbers)
                const letterGroups = cleaned.match(/[a-zA-Z]+/g) || [];
                const hasMoreThan3ConsecutiveLetters = letterGroups.some(
                  group => group.length > 3,
                );

                // Validation
                if (cleaned.length < 1) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: '',
                  }));
                } else if (cleaned.length < 5) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: 'Invalid: minimum 5 characters required',
                  }));
                } else if (cleaned.length > 8) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: 'Invalid: maximum 8 characters allowed',
                  }));
                } else if (!hasNumber) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: 'Invalid: must contain at least one number',
                  }));
                } else if (spaceCount !== 1) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: 'Invalid: must contain exactly one space',
                  }));
                } else if (hasLeadingOrTrailingSpace) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber:
                      'Invalid: space cannot be at the start or end',
                  }));
                } else if (hasMoreThan3ConsecutiveLetters) {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber:
                      'Invalid: cannot have more than 3 consecutive letters',
                  }));
                } else {
                  setFormError(prev => ({
                    ...prev,
                    VehicleNumber: '',
                  }));
                }
              }}
            />
          </View>
          {formError.VehicleNumber && (
            <Text style={{color: 'red', fontSize: 12}}>
              {formError.VehicleNumber}
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
                    ? moment(StartToDt, 'YYYY/MM/DD').isAfter(moment(), 'day')
                      ? moment(today, 'YYYY/MM/DD').toDate() // If StartToDt is in the future, use today
                      : moment(StartToDt, 'YYYY/MM/DD').toDate() // Else, use StartToDt
                    : moment(today, 'YYYY/MM/DD').toDate() // Fallback to today
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
            maxLength={11} // local (10) or intl (11) without plus
            value={MobileNumber}
            setValue={text => {
              // Remove all non-digit characters
              const cleaned = text.replace(/[^0-9]/g, '');

              // Set state anyway
              setMobile(cleaned);

              // If empty, clear error
              if (cleaned.length < 1) {
                setFormError({
                  ...formError,
                  mobile: '',
                });
                return;
              }

              // Validate local format (07XXXXXXXX)
              const isLocalValid = /^07\d{8}$/.test(cleaned);

              // Validate international format (947XXXXXXXX)
              const isInternationalValid = /^947\d{8}$/.test(cleaned);

              if (isLocalValid || isInternationalValid) {
                setFormError({
                  ...formError,
                  mobile: '',
                });
              } else {
                setFormError({
                  ...formError,
                  mobile:
                    'Enter valid LK mobile number (e.g., 0712345678 or 94712345678)',
                });
              }
            }}
          />
          {formError.mobile && (
            <Text style={{color: 'red', fontSize: 12}}>{formError.mobile}</Text>
          )}
          <SquareTextBoxOutlined
            Title={NicNumber}
            Label="NIC Number"
            maxLength={12}
            nic={true}
            value={NicNumber}
            setValue={text => {
              const nicValidation = validateSriLankanNIC(text);

              if (nicValidation.isValid) {
                setFormError({
                  ...formError,
                  nic: '',
                });
              } else {
                setFormError({
                  ...formError,
                  nic: nicValidation.error,
                });
              }

              setNic(text);
            }}
          />
          {formError.nic && (
            <Text style={{color: 'red', fontSize: 12}}>{formError.nic}</Text>
          )}
          <SquareTextBoxOutlined
            Title={BusiRegNo}
            Label="Business Reg. No"
            value={BusiRegNo}
            maxLength={12}
            setValue={text => {
              const cleaned = text;
              setBRegNo(cleaned);
            }}
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
            <AlertButton
              onPress={handleSearch}
              disabledColor={Boolean(
                formError.VehicleNumber ||
                  formError.mobile ||
                  formError.nic ||
                  formError.VehicleNumber,
              )}
              disabledButton={Boolean(
                formError.VehicleNumber ||
                  formError.mobile ||
                  formError.nic ||
                  formError.VehicleNumber,
              )}
              Title="Search"
            />
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
