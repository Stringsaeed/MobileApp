import * as React from 'react';
import {useTheme} from '@theme';
import {FunctionComponent, ReactNode} from 'react';
import {
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface BaseButton extends TouchableOpacityProps {
  children?: ReactNode;
  onPress?: any;
  loading?: boolean;
  loadingColor?: string;
  loadingSize?: number;
  color?: string;
  disabled?: boolean;
}

type ButtonType = FunctionComponent<BaseButton>;

export const Button: ButtonType = ({
  color,
  children,
  disabled,
  loading,
  loadingColor,
  loadingSize,
  ...props
}) => {
  const theme = useTheme();

  const activeOpacity = disabled ? 1 : 0.4;
  const onPress = disabled ? () => {} : props.onPress;
  const _color = disabled
    ? theme.colors.disabled
    : color || theme.colors.primary;
  const style = StyleSheet.compose(
    styles.button(_color),
    props.style,
  );

  return (
    <TouchableOpacity
      {...props}
      style={style}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      {loading ? (
        <ActivityIndicator
          // size="small"
          size={loadingSize}
          color={loadingColor || theme.colors.text}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

type StylesType = {
  button: (backgroundColor: string) => ViewStyle;
};

// @ts-ignore
const styles = StyleSheet.create<StylesType>({
  button: (backgroundColor: string): ViewStyle => ({
    backgroundColor,
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
