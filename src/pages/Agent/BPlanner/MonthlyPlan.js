import React, {useState} from 'react';
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

export default function MonthlyPlan({navigation}) {
  const [currentStep, setCurrentStep] = useState(1);

  const StepperItems = [
    {id: 1, Title: 'Policy Info'},
    {id: 2, Title: 'Vehicle Info'},
    {id: 3, Title: 'Customer Basic Info'},
    {id: 4, Title: 'Customer Contact Info'},
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

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Monthly Plan" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
        style={{}}>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.textColor,
            fontSize: 15,
          }}>
          Monthly Plan for 2025/02
        </Text>
        <View>
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Meetings'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Presentation'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Quotations'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Presentations'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Proposals'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Closed'}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Leads'}
            borderColor={COLORS.warmGray}
          />
        </View>
      </ScrollView>
      {/* Navigation Buttons */}
    </View>
  );
}
