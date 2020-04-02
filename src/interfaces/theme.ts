import {TextStyle} from 'react-native';

type Font = {
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
};

export interface Theme {
  dark: boolean;
  roundness: number;
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
    surface: string;
    accent: string;
    error: string;
    onSurface: string;
    onBackground: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    primaryDark?: string;
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
    regular: Font;
    medium: Font;
    light: Font;
    thin: Font;
  };
  animation: {
    scale: number;
  };
}
