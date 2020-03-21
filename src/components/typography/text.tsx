import * as React from 'react';
import {
  StyleSheet,
  Text as RnText,
  TextProps as RnTextProps,
  TextStyle,
} from 'react-native';
import {useTheme} from '@theme';

export interface TextProps extends RnTextProps {
  weight: 'black' | 'bold' | 'medium' | 'regular' | 'light' | 'extraLight';
  children: React.ReactNode;
}

export const Text = ({weight, children, ...props}: TextProps) => {
  const theme = useTheme();
  const style = StyleSheet.compose<TextStyle>(
    {fontSize: 14},
    [{...theme.fonts[weight], color: theme.colors.text}, props.style],
  );
  return (
    <RnText {...props} style={style}>
      {children}
    </RnText>
  );
};

Text.defaultProps = {
  weight: 'regular',
};
