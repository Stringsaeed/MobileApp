import * as React from 'react';
import {COLORS} from '@styles';
import {StyleSheet, TextStyle} from 'react-native';

import {Text, TextProps} from './text';
import {useTheme} from '@theme';

type LabelType = React.FunctionComponent<TextProps>;

export const Label: LabelType = props => {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[styles.label, {color: theme.colors.text}, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create<{
  label: TextStyle;
}>({
  label: {
    fontSize: 17,
    color: COLORS.black,
  },
});
