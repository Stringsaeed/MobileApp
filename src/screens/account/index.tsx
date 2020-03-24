import {useState} from 'react';
import * as React from 'react';
import {useTheme} from '@theme';
import {List} from 'react-native-paper';
import Auth from '@react-native-firebase/auth';
import {Screen, Text, Title} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {ActionType, ParamsList, ReduxState, UserStore} from '@interfaces';
import Matrial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

interface ProfileProps {
  navigation: BottomTabNavigationProp<ParamsList>;
}

type ProfileScreenType = React.FunctionComponent<ProfileProps>;

export const ProfileScreen: ProfileScreenType = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);

  const theme = useTheme();
  const dispatch = useDispatch();
  const {name, email, phone} = useSelector<ReduxState, UserStore>(
    state => state.user,
  );
  const onLogOut = async () => {
    if (Auth().currentUser) {
      await Auth().signOut();
    }
    await AsyncStorage.removeItem('@USER_LOGIN');
    dispatch<ActionType>({
      type: '@LOGOUT/USER',
    });
  };
  return (
    <Screen type="static" style={{paddingTop: theme.spacing.medium}}>
      <Title
        weight="bold"
        style={{
          paddingTop: theme.spacing.large,
          marginBottom: theme.spacing.medium,
        }}>
        {name}
      </Title>
      <Text
        weight="regular"
        style={{
          fontFamily: 'RobotoMono-Regular',
          textTransform: 'lowercase',
        }}>
        {email}
      </Text>
      <Text
        weight="regular"
        style={{
          fontFamily: 'RobotoMono-Regular',
          textTransform: 'lowercase',
        }}>
        {phone}
      </Text>
      <List.Section>
        <List.Subheader theme={theme}>Settings</List.Subheader>
        <List.Item
          title="Notifications"
          onPress={() => setPushNotifications(!pushNotifications)}
          right={_props => (
            <List.Icon
              {..._props}
              icon={__props => (
                <Feather
                  {...__props}
                  name={pushNotifications ? 'toggle-right' : 'toggle-left'}
                />
              )}
            />
          )}
          theme={theme}
          left={_props => (
            <List.Icon
              {..._props}
              style={{
                ..._props.style,
              }}
              icon={__props => (
                <Feather
                  {...__props}
                  name={pushNotifications ? 'bell' : 'bell-off'}
                />
              )}
            />
          )}
        />
        <List.Item
          title="Dark Mode"
          theme={theme}
          onPress={() => {
            dispatch<ActionType>({
              type: theme.dark ? '@THEME/TOGGLE_LIGHT' : '@THEME/TOGGLE_DARK',
            });
          }}
          right={_props => (
            <List.Icon
              {..._props}
              icon={__props => (
                <Feather
                  {...__props}
                  name={theme.dark ? 'toggle-right' : 'toggle-left'}
                />
              )}
            />
          )}
          left={_props => (
            <List.Icon
              {..._props}
              style={{
                ..._props.style,
              }}
              icon={__props => <Matrial {...__props} name="theme-light-dark" />}
            />
          )}
        />
        <List.Item
          title="My Posts"
          theme={theme}
          onPress={() => {
            navigation.navigate('MY_POSTS', {});
          }}
          right={_props => (
            <List.Icon
              {..._props}
              icon={__props => <Feather {...__props} name={'chevron-right'} />}
            />
          )}
          left={_props => (
            <List.Icon
              {..._props}
              style={{
                ..._props.style,
              }}
              icon={__props => <Feather {...__props} name="edit-3" />}
            />
          )}
        />
        <List.Item
          title="Logout"
          theme={theme}
          onPress={() => {
            onLogOut();
          }}
          right={_props => (
            <List.Icon
              {..._props}
              icon={__props => <Feather {...__props} name={'chevron-right'} />}
            />
          )}
          left={_props => (
            <List.Icon
              {..._props}
              style={{
                ..._props.style,
              }}
              icon={__props => <Feather {...__props} name="log-out" />}
            />
          )}
        />
      </List.Section>
    </Screen>
  );
};
