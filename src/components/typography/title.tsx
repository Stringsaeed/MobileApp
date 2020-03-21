import * as React from 'react';
import {COLORS} from '@styles';
import {StyleSheet, TextStyle} from 'react-native';

import {Text, TextProps} from './text';
import {useTheme} from '@theme';

type TitleType = React.FunctionComponent<TextProps>;

export const Title: TitleType = props => {
  const theme = useTheme();
  const style = StyleSheet.compose(
    [styles.title, {color: theme.colors.text}],
    props.style,
  );
  return (
    <Text weight="black" {...props} style={style}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create<{
  title: TextStyle;
}>({
  title: {
    fontSize: 20,
    color: COLORS.black,
  },
});
