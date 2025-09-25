import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import DropdownComponent from '../../../components/DropdownComponent';
import Button from '../../../components/Button';
import AlertButtonWhite from '../../../components/AlertButtonWhite';
import AlertButton from '../../../components/AlertButton';
import Fonts from '../../../theme/Fonts';
import SmallButton from '../../../components/SmallButton';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import {styles} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import MonthYearPicker from '../../../components/MonthYearPicker';
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  useGetEventsAndActivitiessQuery,
  useLeadCreationMutation,
} from '../../../redux/services/plannerSlice';
import {showToast} from '../../../components/ToastMessage';
import {validateSriLankanNIC} from '../../../utils/nicValidation';

export default function LeadCreation({navigation, route}) {
  const {eventDate} = route.params;
  const userCode = useSelector(state => state.Profile.userCode);
  const agentCode = useSelector(state => state.Profile.agentCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const date = eventDate;
  const {
    data: PlannerActivities,
    isFetching,
    refetch,
    error,
  } = useGetEventsAndActivitiessQuery({
    date,
    userCode: usertype == 2 ? personalCode : userCode,
  });
  const [dropdownData, setDropdownData] = useState([]);
  const dropdownArray = PlannerActivities?.data?.plannerEvents;

  useEffect(() => {
    if (dropdownArray?.length && dropdownData.length === 0) {
      setDropdownData(
        dropdownArray.map(({eventDesc, eventId}) => ({
          label: eventDesc,
          value: eventId.toString(),
        })),
      );
    }
  }, [dropdownArray]); // Runs only when dropdownArray changes

  const [leadCreate, {data: newActivity, isLoading, error: errorEvents}] =
    useLeadCreationMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isPickerVisible2, setPickerVisible2] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  // console.log('eventDate', eventDate);
  const [event, setEvent] = useState(-1);
  const [leadType, setLeadType] = useState(null);
  const [policyNo, setPolicyNo] = useState(null);
  const [insCom, setInsCom] = useState(null);
  const [premium, setPremium] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refNo, setRefNo] = useState(null);
  const [vehicleNo, setVehicleNo] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleValue, setVehicleValue] = useState(null);
  const [yom, setYom] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [nic, setNic] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [homeNumber, setHomeNumber] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [workNumber, setWorkNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [address3, setAddress3] = useState(null);
  const [formError, setFormError] = useState({});
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [homeNumberError, setHomeNumberError] = useState('');
  const [workNumberError, setWorkNumberError] = useState('');
  const [yomError, setYomError] = useState('');

  const eventRef = React.useRef();
  useEffect(() => {
    refetch();
  }, [date]);

  const StepperItems = [
    {id: 1, Title: 'Policy Info'},
    {id: 2, Title: 'Vehicle Info'},
    {id: 3, Title: 'Customer Basic Info'},
    {id: 4, Title: 'Customer Contact Info'},
  ];
  // const isValidSriLankanNumber = number => {
  //   const cleaned = number.replace(/[^0-9]/g, '');

  //   // Accept either 10-digit local format or international format with +94
  //   const localPattern = /^(07\d{8}|0\d{9})$/;
  //   const intlPattern = /^94\d{9}$/;

  //   return localPattern.test(cleaned) || intlPattern.test(cleaned);
  // };
  const validateYOM = yearString => {
    const year = parseInt(yearString, 10);
    const currentYear = new Date().getFullYear();

    if (!yearString || yearString.length !== 4 || isNaN(year)) {
      return 'Year must be a 4-digit number.';
    }

    if (year > currentYear) {
      return `Year cannot be in the future (>${currentYear}).`;
    }

    return null; // valid
  };

  const isValidSriLankanNumber = number => {
    const cleaned = number.replace(/[^0-9]/g, '');

    // If it's empty, skip validation (considered optional)
    if (cleaned.length === 0) return true;

    // Must be either valid local or international format
    const localPattern = /^(07\d{8}|0\d{9})$/;
    const intlPattern = /^94\d{9}$/;

    return localPattern.test(cleaned) || intlPattern.test(cleaned);
  };
  const handleNext = () => {
    // return;
    if (currentStep < StepperItems.length) {
      console.log(currentStep);

      if (currentStep === 1) {
        if (leadType === 'G') {
          setVehicleNo(null);
          setVehicleType(null);
          setVehicleValue(null);
          setYom(null);
          setCurrentStep(3);
        } else {
          if (validateForm1()) {
            setCurrentStep(2);
          }
        }
      } else if (currentStep === 2) {
        console.log(currentStep);
        if (validateForm2()) {
          console.log('trigger2');
          setCurrentStep(3);
        }
      } else if (currentStep === 3) {
        console.log('sssef', currentStep);
        if (validateForm3()) {
          console.log('trigger');
          setCurrentStep(4);
        }
      }

      // setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleLeadCreate();
    }
  };

  const handleBack = () => {
    if (leadType === 'G' && currentStep === 3) {
      setCurrentStep(1);
    } else {
      if (currentStep > 1) {
        setCurrentStep(prevStep => prevStep - 1);
      }
    }
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', moment(date).format('DD-MM-YYYY'));
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm2 = date => {
    console.warn('A date has been picked: ', moment(date).format('DD-MM-YYYY'));
    setSelectedDate2(moment(date).format('YYYY-MM-DD'));
    hideDatePicker2();
  };

  const clearEvents = () => {
    eventRef.current?.clear();
    setEvent(-1);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  // useEffect(() => {
  //   showToast({
  //     type: 'error',
  //     text1: 'Validation Error',
  //     text2: 'Please fill in all required fields. 🚨',
  //   });
  // }, [])

  // API Intergration

  const body = {
    LeadId: 0,
    EventId: event || -1,
    LeadType: leadType,
    CustomerName: customerName,
    CustomerName2: null,
    PolicyNumber: policyNo,
    HomeNumber: homeNumber,
    MobileNumber: mobileNumber,
    WorkNumber: workNumber,
    Email: email,
    Address1: address1,
    Address2: address2,
    Address3: address3,
    NicNumber: nic,
    VehicleNumber: vehicleNo,
    VehicleType: vehicleType,
    VehicleValue: vehicleValue,
    InsCompany: insCom,
    Premium: premium,
    RenewalDate: selectedDate,
    DateOfBirth: selectedDate2,
    Occupation: occupation,
    Status: 'N',
    ClosedDate: null,
    ClosedPolNo: null,
    IconImage: null,
    LeadSource: null,
    Address4: null,
    RefNo: refNo,
    AgentCode: usertype == 2 ? personalCode : userCode,
    VehicleManuf: yom,
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const hasCapitalLetter = /[A-Z]/.test(email);
    return emailRegex.test(email) && !hasCapitalLetter;
  };

  const validateForm1 = () => {
    if (
      !leadType
      // !policyNo ||
      // !insCom ||
      // !premium ||
      // !selectedDate ||
      // !refNo
    ) {
      console.log('test errors');
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Lead type is mandatory. 🚨',
      });
      return false;
    }

    return true;
  };

  const currentYear = new Date().getFullYear();

  const validateForm2 = () => {
    if (!vehicleNo || !vehicleType || !vehicleValue || !yom) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. ',
      });
      return false;
    }
    if (vehicleNo.length < 5 && vehicleNo.length > 0) {
      setFormError({
        vehicleNo: 'Vehicle number must be between 5 and 8 characters.',
      });
      return false;
    }
    if (yom && yom.length != 4) {
      console.log('yom', yom.length);
      setFormError({
        yom: 'Year of manufacture must be 4 digits.',
      });
      return false;
    }
    if (yom && yom.length == 4 && yom < 1900) {
      setFormError({
        yom: 'Year of manufacture must be greater than 1900.',
      });
      return false;
    }
    if (yom && yom.length == 4 && yom > currentYear) {
      setFormError({
        yom: `Year of manufacture cannot be in the future (${currentYear}).`,
      });
      return false;
    }
    setFormError({});
    return true;
  };

  const validateForm3 = () => {
    if (
      !customerName
      // || !nic || !selectedDate2 || !occupation
    ) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Customer name is required. 🚨',
      });
      return false;
    }
    if (nic) {
      const nicValidation = validateSriLankanNIC(nic);

      if (!nicValidation.isValid) {
        showToast({
          type: 'error',
          text1: 'Invalid NIC Number',
          text2: nicValidation.error + ' 🚨',
        });
        return false;
      }
    }
    if (nic) {
      const nicValidation = validateSriLankanNIC(nic);

      if (!nicValidation.isValid) {
        showToast({
          type: 'error',
          text1: 'Invalid NIC Number',
          text2: nicValidation.error + ' 🚨',
        });
        return false;
      }
    }
    return true;
  };
  const validateForm4 = () => {
    // console.log('here', homeNumber, mobileNumber, workNumber, email, address1);
    if (!mobileNumber) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Mobile number is required. 🚨',
      });
      return false;
    }
    if (!isValidSriLankanNumber(mobileNumber)) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Invalid mobile number format. 📱',
      });
      return false;
    }
    if (homeNumber && !isValidSriLankanNumber(homeNumber)) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Invalid home number format. ☎️',
      });
      return false;
    }
    if (workNumber && !isValidSriLankanNumber(workNumber)) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Invalid work number format. 🏢',
      });
      return false;
    }
    return true;
  };
  const handleLeadCreate = async () => {
    if (!validateForm4()) {
      // Stop if validation fails
      console.log('work');

      return;
    }

    // if (!isValidEmail(email)) {
    //   showToast({
    //     type: 'error',
    //     text1: 'Invalid Email',
    //     text2: 'Please enter a valid email address. 📧',
    //   });
    //   return;
    // }
    if (email && !isValidEmail(email)) {
      showToast({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address. 📧',
      });
      return;
    }

    try {
      console.log('body', body);
      const response = await leadCreate(body);
      // setModalVisible(false);
      console.log('lead Created:', response);
      if (response?.data?.success == true) {
        showToast({
          type: 'success',
          text1: 'Lead Created Successfully',
          text2: response?.data?.message,
        });
        // navigation.navigate('BPlanner');
        navigation.goBack();
      } else {
        showToast({
          type: 'error',
          text1: 'Lead Creation Failed',
          text2: response?.data?.message || 'Please try again later. 🚨',
        });
      }
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={{}}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              style={{backgroundColor: 'red'}}
              datePickerModeAndorid={'spinner'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <Text
              style={{
                marginBottom: 5,
                marginTop: 5,
                fontSize: 12.5,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.ashBlue,
              }}>
              Lead Type <Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <DropdownComponentNoLabel
              onSelect={value => setLeadType(value)}
              value={leadType}
              dropdownData={[
                {label: 'Motor', value: 'M'},
                {label: 'Non-Motor', value: 'G'},
              ]}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Policy Number'}
              value={policyNo}
              borderColor={COLORS.warmGray}
              setValue={text => setPolicyNo(text)}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Insurance Company'}
              value={insCom}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const cleanedText = text.replace(/[^A-Za-z0-9]/g, '');
                setInsCom(cleanedText);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Premium'}
              value={premium ? Number(premium)?.toLocaleString() : ''}
              borderColor={COLORS.warmGray}
              keyboardType={'number-pad'}
              setValue={text => {
                const numericText = text.replace(/[^0-9]/g, '');
                setPremium(numericText);
              }}
            />
            <View style={{flexDirection: 'row', position: 'relative'}}>
              <SquareTextBoxOutlined
                mediumFont={true}
                readOnly={true}
                value={selectedDate}
                Label={'Renewal Date'}
                borderColor={COLORS.warmGray}
              />
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                style={{
                  position: 'absolute',
                  bottom: 9,
                  right: 12,
                }}>
                <Feather name="calendar" color={COLORS.primary} size={20} />
              </TouchableOpacity>
            </View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Ref. No. (If any)'}
              value={refNo}
              borderColor={COLORS.warmGray}
              setValue={text => setRefNo(text)}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Number *'}
              borderColor={COLORS.warmGray}
              value={vehicleNo}
              // setValue={text => {
              //   54;
              //   const cleanedText = text.replace(/[^A-Za-z0-9\ ]/g, '').trim().toLowerCase();

              //   if (cleanedText.length >= 5 && cleanedText.length <= 8) {
              //     setVehicleNo(cleanedText);
              //     setFormError({});
              //   } else if (cleanedText.length > 8) {
              //     52;
              //     setVehicleNo(cleanedText.slice(0, 8));
              //   } else if (cleanedText.length < 5 && cleanedText.length > 0) {
              //     setVehicleNo(cleanedText);
              //     setFormError({
              //       vehicleNo:
              //         'Vehicle number must be between 5 and 8 characters.',
              //     });
              //     1;
              //   } else {
              //     setVehicleNo('');
              //   }
              // }}
              setValue={text => {
                // Allow only letters, numbers and space (but do not trim)
                const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, '');

                setVehicleNo(cleaned);

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
                    vehicleNo: '',
                  }));
                } else if (cleaned.length < 5) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: 'Invalid: minimum 5 characters required',
                  }));
                } else if (cleaned.length > 8) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: 'Invalid: maximum 8 characters allowed',
                  }));
                } else if (!hasNumber) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: 'Invalid: must contain at least one number',
                  }));
                } else if (spaceCount !== 1) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: 'Invalid: must contain exactly one space',
                  }));
                } else if (hasLeadingOrTrailingSpace) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: 'Invalid: space cannot be at the start or end',
                  }));
                } else if (hasMoreThan3ConsecutiveLetters) {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo:
                      'Invalid: cannot have more than 3 consecutive letters',
                  }));
                } else {
                  setFormError(prev => ({
                    ...prev,
                    vehicleNo: '',
                  }));
                }
              }}
            />
            {formError.vehicleNo && (
              <Text style={{color: 'red'}}>{formError.vehicleNo}</Text>
            )}
            {/* {(vehicleNo.length < 5 && vehicleNo.length > 0) && (
              <Text style={{color: 'red'}}>
                Vehicle number must be between 5 and 8 characters
              </Text>
            )} */}
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Type *'}
              value={vehicleType}
              borderColor={COLORS.warmGray}
              setValue={text => {
                // Allow only letters and numbers
                const cleanedText = text.replace(/[^A-Za-z0-9]/g, '');
                setVehicleType(cleanedText);
              }}
            />

            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Value *'}
              keyboardType={'number-pad'}
              value={vehicleValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const numericText = text.replace(/[^0-9]/g, '');
                if (numericText.length <= 10) {
                  setVehicleValue(numericText);
                }
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Year of Manufacture *'}
              value={yom}
              keyboardType={'number-pad'}
              errorMessage={yomError + '\n' + (formError.yom || '')}
              borderColor={COLORS.warmGray}
              // setValue={text => {
              //   const numericText = text.replace(/[^0-9]/g, '');
              //   if (numericText.length <= 4) {
              //     setYom(numericText);
              //     setFormError({});
              //   }
              // }}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 4);
                setYom(formatted);

                // Validate YOM (Year of Manufacture)
                if (validateYOM(formatted)) {
                  setYomError('Invalid Manufacture Year');
                } else {
                  setYomError('');
                }

                // Update formError without overwriting other fields
                setFormError(prev => ({
                  ...prev,
                  yom:
                    formatted.length === 4
                      ? ''
                      : 'Year of manufacture must be 4 digits.',
                }));
              }}
            />
            {/* {formError.yom && (
              <Text style={{color: 'red'}}>{formError.yom}</Text>
            )} */}
          </View>
        );
      case 3:
        return (
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              style={{backgroundColor: 'red'}}
              datePickerModeAndorid={'spinner'}
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={
                new Date(new Date().setDate(new Date().getDate() - 1))
              }
            />
            {/* <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              style={{ backgroundColor: 'red' }}
              datePickerModeAndorid={'spinner'}
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
            /> */}
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Customer Name *'}
              borderColor={COLORS.warmGray}
              value={customerName}
              setValue={text => {
                // Allow only letters and numbers
                const cleanedText = text.replace(/[^A-Za-z0-9 ]/g, '');
                setCustomerName(cleanedText);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'NIC Number'}
              borderColor={COLORS.warmGray}
              value={nic}
              setValue={text => {
                const numericText = text.replace(/[^0-9vVxX]/g, '');
                if (numericText.length <= 12) {
                  setNic(numericText);
                }
              }}
            />
            <View style={{flexDirection: 'row', position: 'relative'}}>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Date Of Birth'}
                readOnly={true}
                value={selectedDate2}
                borderColor={COLORS.warmGray}
              />
              <TouchableOpacity
                onPress={() => setDatePickerVisibility2(!isDatePickerVisible2)}
                style={{
                  position: 'absolute',
                  bottom: 9,
                  right: 12,
                }}>
                <Feather name="calendar" color={COLORS.primary} size={20} />
              </TouchableOpacity>
            </View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Occupation'}
              borderColor={COLORS.warmGray}
              value={occupation}
              setValue={text => setOccupation(text)}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Home Number'}
              value={homeNumber}
              errorMessage={homeNumberError}
              borderColor={COLORS.warmGray}
              // setValue={text => {
              //   const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
              //   setHomeNumber(formatted);
              // }}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
                setHomeNumber(formatted);
                if (
                  // formatted.length >= 9 &&
                  !isValidSriLankanNumber(formatted)
                ) {
                  setHomeNumberError('Invalid Sri Lankan mobile number');
                } else {
                  setHomeNumberError('');
                }
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Mobile Number *'}
              value={mobileNumber}
              borderColor={COLORS.warmGray}
              errorMessage={mobileNumberError}
              // setValue={text => {
              //   const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
              //   setMobileNumber(formatted);
              // }}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
                setMobileNumber(formatted);
                if (
                  // formatted.length >= 9 &&
                  !isValidSriLankanNumber(formatted)
                ) {
                  setMobileNumberError('Invalid Sri Lankan mobile number');
                } else {
                  setMobileNumberError('');
                }
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Work Number'}
              value={workNumber}
              errorMessage={workNumberError}
              borderColor={COLORS.warmGray}
              // setValue={text => {
              //   const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
              //   setWorkNumber(formatted);
              // }}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
                setWorkNumber(formatted);
                if (
                  // formatted.length >= 9 &&
                  !isValidSriLankanNumber(formatted)
                ) {
                  setWorkNumberError('Invalid Sri Lankan mobile number');
                } else {
                  setWorkNumberError('');
                }
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Email'}
              value={email}
              borderColor={COLORS.warmGray}
              setValue={text => setEmail(text.toLowerCase())}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Address'}
              value={address1}
              borderColor={COLORS.warmGray}
              setValue={text => setAddress1(text)}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              // Label={'Address'}
              value={address2}
              borderColor={COLORS.warmGray}
              setValue={text => setAddress2(text)}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              // Label={'Address'}
              value={address3}
              borderColor={COLORS.warmGray}
              setValue={text => setAddress3(text)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <MonthYearPicker
        visible={isPickerVisible2}
        onClose={() => setPickerVisible2(false)}
        onSelect={v => setSelectedDate2(v)}
        onSelectText={v => setSelectedDate2(v)}
      />
      <HeaderBackground />
      <Header Title="Lead Creation" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Select Event card */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 6,
            elevation: 10,
            shadowOpacity: 0.2, // add opacity
            shadowRadius: 3, // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}>
          <Text style={{color: COLORS.textColor}}>Select Event</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.63}}>
              <DropdownComponentNoLabel
                ref={eventRef}
                label="Select Event"
                onSelect={value => setEvent(value)}
                dropdownData={dropdownData}
              />
            </View>
            <View style={{flex: 0.35}}>
              <SmallButton
                disabledButton={event ? false : true}
                disabledColor={event ? false : true}
                onPress={() => clearEvents()}
                Title={'Clear'}
              />
            </View>
          </View>
        </View>

        {/* Stepper */}
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{flex: 0.45}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.grayText,
              }}>
              {leadType === 'G' && currentStep > 2
                ? currentStep - 1
                : currentStep}
              /
              {leadType === 'G' ? StepperItems.length - 1 : StepperItems.length}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.textColor,
              }}>
              {StepperItems[currentStep - 1].Title}
            </Text>
          </View>
          <View
            style={{
              flex: 0.55,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {StepperItems.map((item, index) => (
              <View
                key={item.id}
                style={{
                  height: 5,
                  width: 28,
                  backgroundColor:
                    index + 1 === currentStep
                      ? COLORS.primaryGreen
                      : COLORS.warmGray,
                  borderRadius: 20,
                  display: leadType === 'G' && index === 1 ? 'none' : 'flex',
                }}
              />
            ))}
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{paddingHorizontal: 0, marginTop: 3}}>
          {/* <TextInput autoFocus placeholder="svsv" /> */}
          <View style={{marginBottom: 20}}>{renderStepContent()}</View>
        </ScrollView>
        {/* Navigation Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 8,
          }}>
          {currentStep !== 1 && (
            <AlertButtonWhite
              Title={'Back'}
              onPress={handleBack}
              disabled={currentStep === 1}
            />
          )}

          <AlertButton
            Title={currentStep == StepperItems.length ? 'Submit' : 'Next'}
            onPress={handleNext}
            disabledButton={Boolean(formError.vehicleNo)}
            // disabledColor={Boolean(formError.vehicleNo)}
          />
        </View>
      </View>
    </View>
  );
}
