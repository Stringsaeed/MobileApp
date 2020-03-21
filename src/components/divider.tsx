import * as React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '@theme';

const hairLine = StyleSheet.hairlineWidth;

export const Divider: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View
      style={StyleSheet.compose(
        styles.divider,
        {backgroundColor: theme.colors.text},
      )}
    />
  );
};

const styles = StyleSheet.create<{divider: ViewStyle}>({
  divider: {width: '100%', height: hairLine},
});
