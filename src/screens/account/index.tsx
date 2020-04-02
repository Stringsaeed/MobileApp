import {useEffect, useMemo, useState} from 'react';
import * as React from 'react';
import {useTheme} from '@theme';
import {List, Switch, Dialog, Paragraph, Button} from 'react-native-paper';
import Auth from '@react-native-firebase/auth';
import {Screen, Text, Title} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {ActionType, ParamsList, ReduxState, UserStore} from '@interfaces';
import Matrial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Crashlytics from '@react-native-firebase/crashlytics';
import Color from 'color';
import {StatusBar, StatusBarStyle} from 'react-native';

interface ProfileProps {
  navigation: BottomTabNavigationProp<ParamsList>;
}

type ProfileScreenType = React.FunctionComponent<ProfileProps>;

export const ProfileScreen: ProfileScreenType = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme();
  useEffect(() => {
    StatusBar.setBarStyle(
      theme.dark ? 'light-content' : ('dar-content' as StatusBarStyle),
      true,
    );
  }, [theme.dark]);

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
    <>
      <Screen
        type="static"
        style={{
          paddingTop: 0,
          flex: 1,
          paddingHorizontal: 0,
        }}>
        <List.Section>
          <List.Subheader theme={theme}>Account</List.Subheader>
          <List.Item
            left={__props => <List.Icon {...__props} icon="account" />}
            title={name}
            titleStyle={{fontWeight: '700'}}
          />
          <List.Item
            left={__props => <List.Icon {...__props} icon="email" />}
            title={email}
            titleStyle={{
              fontFamily: 'RobotoMono-Regular',
              textTransform: 'lowercase',
            }}
          />
          <List.Item
            left={__props => <List.Icon {...__props} icon="phone" />}
            title={phone}
            titleStyle={{
              fontFamily: 'RobotoMono-Regular',
              textTransform: 'lowercase',
            }}
          />
        </List.Section>
        <List.Section>
          <List.Subheader theme={theme}>Settings</List.Subheader>
          <List.Item
            title="Notifications"
            // onPress={() => setPushNotifications(!pushNotifications)}
            right={_props => (
              <Switch
                {..._props}
                value={pushNotifications}
                theme={theme}
                color={theme.colors.primary}
                onValueChange={setPushNotifications}
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
            right={_props => (
              <Switch
                {..._props}
                value={theme.dark}
                theme={theme}
                color={theme.colors.primary}
                onValueChange={bool => {
                  AsyncStorage.setItem('THEME', JSON.stringify({dark: bool}))
                    .then(res => {
                      dispatch<ActionType>({
                        type: !bool
                          ? '@THEME/TOGGLE_LIGHT'
                          : '@THEME/TOGGLE_DARK',
                      });
                    })
                    .catch(e => {
                      Crashlytics().recordError(e);
                    });
                }}
              />
            )}
            left={_props => (
              <List.Icon
                {..._props}
                style={{
                  ..._props.style,
                }}
                icon={__props => (
                  <Matrial {...__props} name="theme-light-dark" />
                )}
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
                icon={__props => (
                  <Feather {...__props} name={'chevron-right'} />
                )}
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
              setVisible(true);
            }}
            right={_props => (
              <List.Icon
                {..._props}
                icon={__props => (
                  <Feather {...__props} name={'chevron-right'} />
                )}
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
        <Dialog visible={visible} dismissable={false}>
          <Dialog.Title>Logout?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => onLogOut()}>Yes</Button>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Screen>
    </>
  );
};
