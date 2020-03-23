import * as yup from 'yup';
import {useRef, useState} from 'react';
import * as React from 'react';
import {COLORS} from '@styles';
import {useTheme} from '@theme';
import {useFormik} from 'formik';
import {PHONE_REGEX} from '@utils';
import Chevron from '@theme/icons/chevron.svg';
import {RouteProp} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import RegisterIllustration from '@theme/illustrations/register.svg';
import {Button, Caption, Form, Header, Screen, Title} from '@components';
import {
  findNodeHandle,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Messaging from '@react-native-firebase/messaging';
import HelpApi from '@services/http';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType, ParamsList} from '@interfaces';
import {VerificationCodeScreen} from '@screens';
import {AxiosResponse} from 'axios';
import {useDispatch} from 'react-redux';
import {getUniqueId} from 'react-native-device-info';

interface RegisterScreenProps {
  navigation: StackNavigationProp<ParamsList, 'REGISTER_SCREEN'>;
  route: RouteProp<ParamsList, 'REGISTER_SCREEN'>;
}

type RegisterScreenType = React.FunctionComponent<RegisterScreenProps>;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Name'),
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  phone: yup
    .string()
    .required()
    .length(11)
    .matches(PHONE_REGEX, 'Phone is not Valid')
    .label('Phone'),
  password: yup
    .string()
    .required()
    .label('Password'),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation should confirm password',
    )
    .required(),
});

export const RegisterScreen: RegisterScreenType = ({navigation, route}) => {
  const scrollRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse>();
  const [confirm, setConfirm] = useState<any>();
  const theme = useTheme();
  const {top} = useSafeArea();
  const formikInstance = useFormik<{
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
  }>({
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const _response = await HelpApi.post<{
          data: {name: string; email: string; phone: string; token: string};
          message: string;
        }>('/users/register', values);
        setResponse(_response);
        Auth()
          .signInWithPhoneNumber('+2' + values.phone)
          .then(_confirm => setConfirm(_confirm))
          .catch(e => console.log(e));
        setVisible(true);
      } catch (e) {
        console.log(e.response || e);
        if (e.response.status === 422) {
          for (let key in e.response.data.errors) {
            formikHelpers.setFieldError(key, e.response.data.errors[key][0]);
          }
        }
      }
      formikHelpers.setSubmitting(false);
    },
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
  });

  const dispatch = useDispatch();
  const onFocus = (event: Event) => {
    if (scrollRef.current !== null) {
      // @ts-ignore
      const handler = scrollRef.current.props;
      // @ts-ignore
      handler.scrollToFocusedInput(findNodeHandle(event.target));
    }
  };

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
          onPress={() => {}}
        />
      </Header>
      <Form
        extraHeight={200}
        enableOnAndroid
        innerRef={ref => {
          // @ts-ignore
          scrollRef.current = ref;
        }}>
        <RegisterIllustration
          height={175}
          fill={theme.dark ? COLORS.disabled : undefined}
          style={styles.registerIllustration(theme.spacing.large)}
        />
        <Title weight="black" style={styles.title}>
          Welcome To Help!
        </Title>

        <Form.Item
          TIRef={nameRef}
          label="Name"
          onFocus={onFocus}
          returnKeyType="next"
          returnKeyLabel="next"
          textContentType="name"
          autoCompleteType="name"
          dataDetectorTypes="none"
          importantForAccessibility="yes"
          error={formikInstance.errors.name}
          value={formikInstance.values.name}
          placeholder="Please enter your name!"
          onBlur={formikInstance.handleBlur('name')}
          onChangeText={formikInstance.handleChange('name')}
        />
        <Form.Item
          TIRef={emailRef}
          label="Email"
          returnKeyType="next"
          onFocus={onFocus}
          returnKeyLabel="next"
          textContentType="emailAddress"
          autoCompleteType="email"
          importantForAccessibility="yes"
          error={formikInstance.errors.email}
          value={formikInstance.values.email}
          placeholder="Please enter your email!"
          onBlur={formikInstance.handleBlur('email')}
          onChangeText={formikInstance.handleChange('email')}
        />
        <Form.Item
          TIRef={phoneRef}
          label="Phone"
          returnKeyType="next"
          returnKeyLabel="next"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          importantForAccessibility="yes"
          error={formikInstance.errors.phone}
          value={formikInstance.values.phone}
          placeholder="Please enter your phone!"
          onBlur={formikInstance.handleBlur('phone')}
          onFocus={onFocus}
          onChangeText={formikInstance.handleChange('phone')}
        />
        <Form.Item
          TIRef={passwordRef}
          secureTextEntry
          label="Password"
          returnKeyType="next"
          returnKeyLabel="next"
          autoCompleteType="password"
          textContentType="newPassword"
          importantForAccessibility="yes"
          error={formikInstance.errors.password}
          value={formikInstance.values.password}
          placeholder="Please enter your password!"
          onFocus={onFocus}
          onBlur={formikInstance.handleBlur('password')}
          onChangeText={formikInstance.handleChange('password')}
        />
        <Form.Item
          secureTextEntry
          returnKeyType="done"
          returnKeyLabel="Done"
          label="Confirm Password"
          TIRef={confirmPasswordRef}
          textContentType="password"
          autoCompleteType="password"
          importantForAccessibility="yes"
          placeholder="Please confirm your password!"
          error={formikInstance.errors.password_confirmation}
          value={formikInstance.values.password_confirmation}
          onFocus={onFocus}
          onBlur={formikInstance.handleBlur('password_confirmation')}
          onChangeText={formikInstance.handleChange('password_confirmation')}
        />

        <Caption weight="regular">
          Already have account? <Caption weight="bold">Sign In</Caption>
        </Caption>

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
      <VerificationCodeScreen
        visible={visible}
        dismiss={() => setVisible(false)}
        onPressConfirm={code => {
          setVisible(false);
          confirm.confirm(code).then((_res: any) => {
            HelpApi.interceptors.request.use(
              config => {
                config.headers.Authorization = `Bearer ${typeof response !==
                  'undefined' && response.data.data.token}`;
                return config;
              },
              () => {},
            );
            Messaging()
              .getToken()
              .then(token => {
                HelpApi.post('/users/devices', {
                  device_type: Platform.OS,
                  fcm_token: token,
                  device_id: getUniqueId(),
                });
              });
            AsyncStorage.setItem(
              '@USER_LOGIN',
              JSON.stringify(
                typeof response !== 'undefined' &&
                  response.data &&
                  response.data.data,
              ),
            );
            dispatch<ActionType>({
              type: '@LOGIN/USER',
              payload:
                typeof response !== 'undefined' &&
                response.data &&
                response.data.data,
            });
          });
        }}
      />
    </Screen>
  );
};

type RegisterScreenStyles = {
  screen: (paddingTop: number) => ViewStyle;
  title: TextStyle;
  registerIllustration: (marginBottom: number) => ViewStyle;
  button: (backgroundColor: string) => ViewStyle;
  center: ViewStyle;
  row: ViewStyle;
};

// @ts-ignore
const styles = StyleSheet.create<RegisterScreenStyles>({
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
    fontSize: 24,
  },
  registerIllustration: (marginBottom: number): ViewStyle => ({
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
