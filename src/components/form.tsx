import * as React from 'react';
import {COLORS} from '@styles';
import {FunctionComponent, Ref} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

import {Caption, Label} from './typography';
import {useTheme} from '@theme';

interface FormProps extends KeyboardAwareScrollViewProps {}
interface FormItemProps extends TextInputProps {
  label: string;
  error?: string | boolean;
  TIRef?: Ref<TextInput>;
  onBlur?: any;
  onSubmitEditing?: any;
  onChangeText?: any;
  onFocus?: any;
  container?: ViewStyle;
}

type FormItemType = FunctionComponent<FormItemProps>;

type FormType = FunctionComponent<FormProps> & {
  Item: FormItemType;
};

const styles = StyleSheet.create<{
  input: ViewStyle | TextStyle;
  container: ViewStyle;
}>({
  container: {
    // borderWidth: 0.4,
    marginBottom: 8,
    // borderRadius: 5,
    height: 'auto',
    padding: 8,
    // backgroundColor: COLORS.white,
  },
  input: {
    color: COLORS.black,
    borderBottomWidth: 0.8,
    paddingVertical: 5,
  },
});

const FormItem: FormItemType = ({label, error, TIRef, container, ...props}) => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            // backgroundColor: theme.colors.onSurface,
            marginBottom: theme.spacing.large,
            justifyContent: 'space-between',
          },
          container,
        ]}>
        <Label
          weight="bold"
          style={{color: error ? COLORS.error : theme.colors.text}}>
          {label}
        </Label>
        <TextInput
          ref={TIRef}
          style={[
            styles.input,
            {
              borderBottomColor: error ? COLORS.error : theme.colors.text,
              color: error ? COLORS.error : theme.colors.text,
            },
          ]}
          placeholderTextColor={theme.dark ? COLORS.disabled : undefined}
          {...props}
        />
        <Caption weight="medium" style={{paddingTop: 3, color: COLORS.error}}>
          {error}
        </Caption>
      </View>
    </View>
  );
};

const Form: FormType = props => {
  return (
    <KeyboardAwareScrollView {...props}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};

Form.Item = FormItem;

export default Form;
