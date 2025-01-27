import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../../theme/colors';




const window = Dimensions.get('window');

export const Styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
    },
    platformStyle: {
        flex: 1,
        paddingVertical: 23,
        alignItems: 'center',
        justifyContent: 'center',

    },


});
