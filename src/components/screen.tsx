import * as React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '@theme';
import {
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useMemo} from 'react';
import Color from 'color';

interface ScreenProps extends ScrollViewProps {
  type: 'scroll' | 'static';
  children: React.ReactNode;
}

export const Screen = ({type, children, ...props}: ScreenProps) => {
  const theme = useTheme();
  const {bottom, top} = useSafeArea();

  const statusBarColor = useMemo(
    () => Color(theme.colors.primary).darken(0.5),
    [theme.colors.primary],
  );

  const style = StyleSheet.compose(
    {
      flex: 1,
      paddingTop: top,
      paddingBottom: bottom,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.medium,
      overflow: 'visible',
    },
    props.style,
  );

  if (type === 'scroll') {
    return (
      <ScrollView {...props} contentContainerStyle={style}>
        <StatusBar backgroundColor={statusBarColor.toString()} />
        {children}
      </ScrollView>
    );
  } else {
    return (
      <View {...props} style={style}>
        <StatusBar backgroundColor={statusBarColor.toString()} />
        {children}
      </View>
    );
  }
};
