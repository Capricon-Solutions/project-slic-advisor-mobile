import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Styles } from '../../../theme/Styles';
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
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import MonthYearPicker from '../../../components/MonthYearPicker';

export default function LeadCreation({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isPickerVisible2, setPickerVisible2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const StepperItems = [
    { id: 1, Title: 'Policy Info' },
    { id: 2, Title: 'Vehicle Info' },
    { id: 3, Title: 'Customer Basic Info' },
    { id: 4, Title: 'Customer Contact Info' },
  ];

  const handleNext = () => {
    if (currentStep < StepperItems.length) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      navigation.navigate('BPlanner');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={{}}>
            <Text
              style={{
                marginBottom: 5,
                marginTop: 5,
                fontSize: 12.5,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.ashBlue,
              }}>
              Lead Type
            </Text>
            <DropdownComponentNoLabel
              dropdownData={[
                { label: 'Appointment', value: '1' },
                { label: 'Pending', value: '2' },
                { label: 'Complete', value: '3' },
              ]}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Policy Number'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Insurance Company'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'premium'}
              borderColor={COLORS.warmGray}
            />
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <SquareTextBoxOutlined
                mediumFont={true}
                readOnly={true}
                value={selectedDate}
                Label={'Renewal Date'}
                borderColor={COLORS.warmGray}
              />
              <TouchableOpacity
                onPress={() => setPickerVisible(true)}
                style={{
                  position: 'absolute',
                  bottom: 9,
                  right: 12
                }}>
                <Feather name="calendar" color={COLORS.primary} size={20} />
              </TouchableOpacity>
            </View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Ref. No. (If any)'}
              borderColor={COLORS.warmGray}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Number'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Type'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Vehicle Value'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Year of manufacture'}
              borderColor={COLORS.warmGray}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Customer Name'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'NIC Number'}
              borderColor={COLORS.warmGray}
            />
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Date Of Birth'}
                readOnly={true}
                value={selectedDate2}
                borderColor={COLORS.warmGray}
              />
              <TouchableOpacity
                onPress={() => setPickerVisible2(true)}
                style={{
                  position: 'absolute',
                  bottom: 9,
                  right: 12
                }}>
                <Feather name="calendar" color={COLORS.primary} size={20} />
              </TouchableOpacity>
            </View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Occupation'}
              borderColor={COLORS.warmGray}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Home Number'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Mobile Number'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Work Number'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Email'}
              borderColor={COLORS.warmGray}
            />
            <SquareTextBoxOutlined
              mediumFont={true}
              Label={'Address'}
              borderColor={COLORS.warmGray}
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
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        {/* Select Event card */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 6,
            elevation: 10,
          }}>
          <Text style={{}}>Select Event</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flex: 0.63 }}>
              <DropdownComponentNoLabel
                label={'Select Event'}
                dropdownData={[
                  { label: 'Appointment', value: '1' },
                  { label: 'Pending', value: '2' },
                  { label: 'Complete', value: '3' },
                ]}
              />
            </View>
            <View style={{ flex: 0.35 }}>
              <SmallButton Title={'Set as Default'} />
            </View>
          </View>
        </View>

        {/* Stepper */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 0.45 }}>
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
          contentContainerStyle={{ paddingHorizontal: 0, marginTop: 3 }}>
          {/* <TextInput autoFocus placeholder="svsv" /> */}
          <View style={{ marginBottom: 20 }}>{renderStepContent()}</View>
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
