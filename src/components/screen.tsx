import * as React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTheme} from '@theme';
import {ScrollView, ScrollViewProps, StyleSheet, View} from 'react-native';
import {useMemo} from 'react';

interface ScreenProps extends ScrollViewProps {
  type: 'scroll' | 'static';
  children: React.ReactNode;
}

export const Screen = React.memo(({type, children, ...props}: ScreenProps) => {
  const theme = useTheme();
  const {bottom, top} = useSafeArea();
  useMemo(() => {
    console.log(top);
  }, [top]);
  const style = StyleSheet.compose(
    {
      flex: 1,
      paddingTop: top,
      paddingBottom: bottom,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.large,
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
      <View {...props} style={style}>
        {children}
      </View>
    );
  }
});
