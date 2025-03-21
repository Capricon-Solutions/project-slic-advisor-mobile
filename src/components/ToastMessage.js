import React from 'react';
import Toast from 'react-native-toast-message';
import COLORS from '../theme/colors';

const showToast = ({
  type,
  text1 = 'Error',
  text2 = '',
  text1Style,
  text2Style,
}) => {
  Toast.show({
    type,
    text1,
    text2,
    text1Style: text1Style || {
      fontSize: 16,
      color:
        type == 'error'
          ? COLORS.primaryOrange
          : type == 'info'
          ? COLORS.primary
          : COLORS.primaryGreen,
    },
    text2Style: text2Style || {
      fontSize: 14,
      color:
        type == 'error'
          ? COLORS.errorBorder
          : type == 'info'
          ? COLORS.lightPrimary
          : COLORS.grassGreen,
    },
  });
};

const ToastMessage = () => {
  return <Toast />;
};

export {ToastMessage, showToast};
