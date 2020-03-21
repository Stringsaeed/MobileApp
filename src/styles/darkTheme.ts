import {DarkTheme as RNDarkTheme} from '@react-navigation/native';
import {Theme} from '@interfaces';
import {COLORS} from '@styles/styles';

export const DarkTheme: Theme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    primary: '#B3A7FF',
    background: COLORS.black,
    disabled: COLORS.disabled,
    general: '#6642f7',
    teaching: COLORS.teaching,
    food: COLORS.food,
    string: COLORS.white,
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
  dark: true,
};
