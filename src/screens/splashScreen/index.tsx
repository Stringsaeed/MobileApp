import * as React from 'react';
import {useTheme} from '@theme';
import {ActivityIndicator, View} from 'react-native';

export const SplashScreen = ({}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={theme.colors.text} size="large" />
    </View>
  );
};
