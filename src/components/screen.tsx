import * as React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '@theme';
import {ScrollView, ScrollViewProps, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';

interface ScreenProps extends ScrollViewProps {
  type: 'scroll' | 'static';
  children: React.ReactNode;
}

export const Screen = ({type, children, ...props}: ScreenProps) => {
  const theme = useTheme();
  const {bottom, top} = useSafeArea();
  const style = StyleSheet.compose(
    {
      flex: 1,
      paddingTop: top,
      paddingBottom: bottom,
      // backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.medium,
      overflow: 'visible',
    },
    props.style,
  );

  if (type === 'scroll') {
    return (
      <ScrollView {...props} style={style}>
        {children}
      </ScrollView>
    );
  } else {
    return (
      <Surface {...props} theme={theme} style={style}>
        {children}
      </Surface>
    );
  }
};
