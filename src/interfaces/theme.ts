import {TextStyle} from 'react-native';

type Font = {
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
};

export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    disabled: string;
    general: string;
    teaching: string;
    food: string;
    string: string;
    [key: string]: string;
  };
  spacing: {
    xSmall: number;
    small: number;
    medium: number;
    large: number;
    xLarge: number;
  };
  fonts: {
    [key: string]: Font;
  };
}
