import * as React from 'react';
import {useTheme} from '@theme';
import {Screen} from '@components';
import HelpApi from '@services/http';
import {List} from 'react-native-paper';
import {useCallback, useEffect, useState} from 'react';
import Crashlytics from '@react-native-firebase/crashlytics';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import NotificationsSvg from '@theme/illustrations/undraw_subscriber_vabu.svg';

export const NotificationsScreen = ({}) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const getNotifications = useCallback(async () => {
    try {
      const response = await HelpApi.get('/users/notifications');
      console.log(response);
      setNotifications(response.data.data);
      setIsLoading(false);
    } catch (e) {
      Crashlytics().recordError(e);
    }
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
    <Screen type="static" style={{paddingTop: theme.spacing.medium}}>
      {!isLoading ? (
        <FlatList
          data={notifications}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary, theme.colors.text]}
              refreshing={isLoading}
              onRefresh={() => getNotifications()}
            />
          }
          contentContainerStyle={
            notifications.length
              ? {}
              : {flex: 1, justifyContent: 'center', alignItems: 'center'}
          }
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
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      )}
    </Screen>
  );
};
