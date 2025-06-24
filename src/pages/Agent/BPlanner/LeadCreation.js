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
  console.log('eventDate', eventDate);
  const [event, setEvent] = useState(null);
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

  const handleNext = () => {
    // return;
    if (currentStep < StepperItems.length) {
      console.log(currentStep);

      if (currentStep === 1) {
        if (validateForm1()) {
          setCurrentStep(2);
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
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
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
    EventId: event,
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
    AgentCode: agentCode,
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const validateForm2 = () => {
    if (!vehicleNo || !vehicleType || !vehicleValue || !yom) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return false;
    }
    return true;
  };

  const validateForm3 = () => {
    if (!customerName || !nic || !selectedDate2 || !occupation) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return false;
    }
    return true;
  };
  const validateForm4 = () => {
    // console.log('here', homeNumber, mobileNumber, workNumber, email, address1);
    if (!homeNumber || !mobileNumber || !workNumber || !email || !address1) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return false;
    }
    return true;
  };
  const handleLeadCreate = async () => {
    if (!validateForm4()) {
      // Stop if validation fails
      console.log('work');
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return;
    }

    if (!isValidEmail(email)) {
      showToast({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address. 📧',
      });
      return;
    }

    try {
      const response = await leadCreate(body);
      // setModalVisible(false);
      console.log('Activity Created:', response);
      navigation.navigate('BPlanner');
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
              Lead Type *
            </Text>
            <DropdownComponentNoLabel
              onSelect={value => setLeadType(value)}
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
              Label={'premium'}
              value={premium}
              borderColor={COLORS.warmGray}
              keyboardType={'number-pad'}
              setValue={text => setPremium(text)}
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
              setValue={text => {
                // Allow only letters and numbers
                const cleanedText = text
                  .replace(/[^A-Za-z0-9-]/g, '')
                  .slice(0, 15);
                setVehicleNo(cleanedText);
              }}
            />
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
              value={vehicleValue}
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
              Label={'Year of manufacture *'}
              value={yom}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const numericText = text.replace(/[^0-9]/g, '');
                if (numericText.length <= 4) {
                  setYom(numericText);
                }
              }}
            />
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
                const cleanedText = text.replace(/[^A-Za-z0-9]/g, '');
                setCustomerName(cleanedText);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'NIC Number *'}
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
                Label={'Date Of Birth *'}
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
              Label={'Occupation *'}
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
              Label={'Home Number *'}
              value={homeNumber}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 15);
                setHomeNumber(formatted);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Mobile Number *'}
              value={mobileNumber}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 15);
                setMobileNumber(formatted);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Work Number *'}
              value={workNumber}
              borderColor={COLORS.warmGray}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 15);
                setWorkNumber(formatted);
              }}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Email *'}
              value={email}
              borderColor={COLORS.warmGray}
              setValue={text => setEmail(text)}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Address *'}
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
                Title={'Set as Default'}
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
              {currentStep}/{StepperItems.length}
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
            disabled={currentStep === StepperItems.length}
          />
        </View>
      </View>
    </View>
  );
}
