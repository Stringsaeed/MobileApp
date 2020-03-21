import * as React from 'react';
import {COLORS} from '@styles';
import {StyleSheet, TextStyle} from 'react-native';

import {Text, TextProps} from './text';

type CaptionType = React.FunctionComponent<TextProps>;

export const Caption: CaptionType = props => {
  return (
    <Text {...props} style={[styles.caption, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create<{
  caption: TextStyle;
}>({
  caption: {
    fontSize: 12,
    color: COLORS.disabled,
  },
});
