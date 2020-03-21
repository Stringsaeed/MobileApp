import * as React from 'react';
import {useTheme} from '@theme';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import MapDark from '@styles/map.dark.json';
import MapLight from '@styles/map.light.json';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Screen, Text, Title} from '@components';
import {ActionType, ReduxState, UserStore} from '@interfaces';
import {useSafeArea} from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const theme = useTheme();
  const {top} = useSafeArea();
  const dispatch = useDispatch();
  const {name, email, phone} = useSelector<ReduxState, UserStore>(
    state => state.user,
  );
  return (
    <Screen type="static" style={{paddingTop: top + theme.spacing.medium}}>
      <Header title="Profile">
        <Header.Button
          icon="settings"
          size={24}
          color={theme.colors.text}
          onPress={() =>
            dispatch<ActionType>({
              type: theme.dark ? '@THEME/TOGGLE_LIGHT' : '@THEME/TOGGLE_DARK',
            })
          }
        />
      </Header>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text weight="bold">Dark Mode</Text>
        <Text weight="regular">{theme.dark ? 'OFF' : 'ON'}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text weight="bold">Notifications</Text>
        <Text weight="regular">{theme.dark ? 'OFF' : 'ON'}</Text>
      </View>
      <View
        style={{
          padding: 20,
          flex: 1,
          // overflow: 'hidden',
        }}>
        <MapView
          style={{
            flex: 1,
            // padding: 0,
            // borderTopRightRadius: 50,
            // borderRadius: 400,
            // margin: 0,
            // elevation: 4,
          }}
          showsMyLocationButton
          showsUserLocation
          customMapStyle={theme.dark ? MapDark : MapLight}
          initialRegion={{
            latitude: 29.931309,
            longitude: 31.281283,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
        />
      </View>
    </Screen>
  );
};
