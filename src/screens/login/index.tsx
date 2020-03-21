import * as yup from 'yup';
import {useRef} from 'react';
import * as React from 'react';
import {COLORS} from '@styles';
import {useTheme} from '@theme';
import {useFormik} from 'formik';
import {PHONE_REGEX} from '@utils';
import HelpApi from '@services/http';
import Chevron from '@theme/icons/chevron.svg';
import {RouteProp} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import LoginIllustration from '@theme/illustrations/login.svg';
import {Screen, Form, Caption, Title, Button, Header} from '@components';
import {
  StatusBar,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ActionType} from '@interfaces';
import AsyncStorage from '@react-native-community/async-storage';

interface LoginScreenProps {
  navigation: StackNavigationProp<
    {
      LOGIN_SCREEN: {};
      REGISTER_SCREEN: {};
    },
    'LOGIN_SCREEN'
  >;
  route: RouteProp<{LOGIN_SCREEN: {}}, 'LOGIN_SCREEN'>;
}

type LoginScreenType = React.FunctionComponent<LoginScreenProps>;

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .length(11)
    .label('Phone')
    .matches(PHONE_REGEX, 'Phone is not valid')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required(),
});

export const LoginScreen: LoginScreenType = ({navigation, route}) => {
  const phoneField = useRef<TextInput>(null);
  const passwordField = useRef<TextInput>(null);
  const theme = useTheme();
  const {top} = useSafeArea();
  const dispatch = useDispatch();
  const formikInstance = useFormik<{phone: string; password: string}>({
    initialValues: {
      password: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const response = await HelpApi.post('/users/login', {
          phone: values.phone,
          password: values.password,
        });
        await AsyncStorage.setItem(
          '@USER_LOGIN',
          JSON.stringify(response.data.data),
        );

        dispatch<ActionType>({
          type: '@LOGIN/USER',
          payload: response.data.data,
        });
        console.log(response);
      } catch (e) {
        console.log(e.response || e);
      }
      formikHelpers.setSubmitting(false);
    },
  });

  return (
    <Screen type="static" style={styles.screen(top + theme.spacing.medium)}>
      <StatusBar
        animated
        backgroundColor={theme.colors.background}
        translucent
        showHideTransition="slide"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Header>
        <Header.Button
          icon="settings"
          size={20}
          color={theme.colors.text}
          onPress={() =>
            dispatch<ActionType>({
              type: theme.dark ? '@THEME/TOGGLE_LIGHT' : '@THEME/TOGGLE_DARK',
            })
          }
        />
      </Header>
      <Form>
        <LoginIllustration
          height={150}
          style={styles.loginIllustration(theme.spacing.large)}
        />
        <Title weight="black" style={styles.title}>
          Welcome Back!
        </Title>
        <Form.Item
          TIRef={phoneField}
          label="Phone"
          value={formikInstance.values.phone}
          onChangeText={formikInstance.handleChange('phone')}
          blurOnSubmit={false}
          keyboardType="phone-pad"
          accessibilityLabel="phone"
          accessible
          onBlur={formikInstance.handleBlur('phone')}
          importantForAccessibility="yes"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          dataDetectorTypes="phoneNumber"
          returnKeyLabel="next"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordField.current && passwordField.current.focus()
          }
          error={formikInstance.errors.phone}
          placeholder="Please enter your phone!"
        />
        <Form.Item
          label="Password"
          TIRef={passwordField}
          blurOnSubmit
          onBlur={formikInstance.handleBlur('password')}
          error={
            formikInstance.touched.password && formikInstance.errors.password
          }
          placeholder="Please enter your password!"
          secureTextEntry
          autoCompleteType="password"
          accessibilityLabel="password"
          importantForAccessibility="yes"
          onSubmitEditing={formikInstance.handleBlur('password')}
          onChangeText={formikInstance.handleChange('password')}
          value={formikInstance.values.password}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.replace('REGISTER_SCREEN', {});
          }}>
          <Caption
            weight="regular"
            style={{
              padding: theme.spacing.medium,
              color: theme.colors.text + '3f',
            }}>
            Don't have account?{' '}
            <Caption
              style={{fontSize: 14, color: theme.colors.text}}
              weight="bold">
              Sign Up
            </Caption>
          </Caption>
        </TouchableOpacity>
        <Button
          style={styles.button}
          loadingColor={theme.colors.background}
          loadingSize={24}
          loading={formikInstance.isSubmitting}
          onPress={formikInstance.handleSubmit}
          disabled={
            (!formikInstance.touched.phone &&
              !formikInstance.touched.password) ||
            !formikInstance.isValid
          }>
          <Chevron
            width={24}
            height={24}
            fill={theme.colors.background}
            style={styles.center}
          />
        </Button>
      </Form>
    </Screen>
  );
};

type LoginScreenStyles = {
  screen: (paddingTop: number) => ViewStyle;
  title: TextStyle;
  loginIllustration: (marginBottom: number) => ViewStyle;
  button: ViewStyle;
  center: ViewStyle;
  row: ViewStyle;
};

// @ts-ignore
const styles = StyleSheet.create<LoginScreenStyles>({
  screen: (paddingTop: number): ViewStyle => ({
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: -2,
      width: 5,
    },
    shadowColor: COLORS.shadow,
    paddingTop,
  }),
  title: {
    textAlign: 'center',
    fontSize: 28,
  },
  loginIllustration: (marginBottom: number): ViewStyle => ({
    alignSelf: 'center',
    marginBottom,
  }),
  button: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  center: {
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
