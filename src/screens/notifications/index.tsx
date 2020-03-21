import * as React from 'react';
import {List} from 'react-native-paper';
import {Header, Screen} from '@components';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useTheme} from '@theme';
import {useCallback, useEffect, useState} from 'react';
import HelpApi from '@services/http';
import {useSafeArea} from 'react-native-safe-area-context';
import NotificationsSvg from '@theme/illustrations/undraw_subscriber_vabu.svg';

export const NotificationsScreen = ({}) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const {top} = useSafeArea();
  const getNotifications = useCallback(async () => {
    console.log('a8a');
    try {
      const response = await HelpApi.get('/users/notifications');
      console.log(response);
      setNotifications(response.data.data);
      setIsLoading(false);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  const renderNotification = ({item}: {item: any}) => {
    return (
      <List.Item title={item.title} description={item.body} theme={theme} />
    );
  };
  return (
    <Screen type="static" style={{paddingTop: top + theme.spacing.medium}}>
      <Header title="Notifications">
        <Header.Button
          icon="settings"
          size={24}
          color={theme.colors.text}
          onPress={() => {}}
        />
      </Header>
      {!isLoading ? (
        <FlatList
          data={notifications}
          ListEmptyComponent={
            <NotificationsSvg
              width={300}
              height={300}
              style={{flex: 1, alignSelf: 'center'}}
            />
          }
          renderItem={renderNotification}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={theme.colors.text} />
        </View>
      )}
    </Screen>
  );
};
