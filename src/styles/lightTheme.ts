import {DefaultTheme as RNLightTheme} from '@react-navigation/native';
import {Theme} from '@interfaces';
import {COLORS} from '@styles/styles';

export const LightTheme: Theme = {
  ...RNLightTheme,
  colors: {
    ...RNLightTheme.colors,
    primary: '#B3A7FF',
    disabled: '#989898',
    general: '#3700b3',
    teaching: COLORS.teaching,
    food: COLORS.food,
    string: '#000000',
  },
  fonts: {
    black: {
      fontFamily: 'Roboto-Black',
      fontWeight: '900',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      fontWeight: '700',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
    },
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: '300',
    },
  },
  spacing: {
    xSmall: 2,
    small: 4,
    medium: 8,
    large: 16,
    xLarge: 32,
  },
  dark: false,
};
