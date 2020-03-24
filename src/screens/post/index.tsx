import * as React from 'react';
import {useTheme} from '@theme';
import HelpApi from '@services/http';
import {Post} from '@interfaces/post';
import {Snackbar} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Label, PostComponent, Screen, Form} from '@components';
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Crashlytics from '@react-native-firebase/crashlytics';
import {ParamsList} from '@interfaces';

interface PostProps {
  navigation: StackNavigationProp<ParamsList, '@POST_SCREEN'>;
  route: RouteProp<ParamsList, '@POST_SCREEN'>;
}
type PostScreenType = React.FunctionComponent<PostProps>;

export const PostScreen: PostScreenType = ({route}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Post>({
    id: '',
    title: '',
    body: '',
    type: {
      id: '',
      name: '',
    },
    comment: [],
    comments: [],
    created_at: 1,
  });
  const [comment, setComment] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();
  const {item} = route.params;

  const getPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await HelpApi.get(`/posts/${item.id}`);
      console.log(response);
      setData(response.data.data);
      setIsLoading(false);
      const test = await HelpApi.get(`/posts/${item.id}/comments`);
      console.log(test);
    } catch (e) {
      console.log(e.response || e);
      Crashlytics().recordError(e);
    }
  }, [item.id]);

  const submitComment = useCallback(async () => {
    try {
      await HelpApi.post(`/posts/${item.id}/comments`, {
        body: comment,
      });
      setMessage('Commented Successfully');
      setComment('');
      getPost();
    } catch (e) {
      Crashlytics().recordError(e);
    }
  }, [comment, getPost, item.id]);

  useEffect(() => {
    getPost().then(r => console.log(r));
  }, [getPost]);

  return (
    <Screen
      type="scroll"
      // contentContainerStyle={{flex: 1}}
      style={{
        flex: 1,
        paddingTop: theme.spacing.medium,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar backgroundColor={theme.colors.background} />
      {isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <PostComponent
            item={{
              ...data,
              comments:
                data.comments instanceof Array ? data.comments.length : 0,
            }}
          />
          <Form.Item
            label="Add comment"
            placeholder="place your comment here"
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={() => {
              submitComment();
            }}
          />
          <Label weight="bold">Comments:</Label>
          {(data.comments instanceof Array ? data.comments : []).map(
            (_comment: {
              id: string;
              user: {name: string; id: string};
              body: string;
            }) => {
              return (
                <View key={_comment.id} style={{marginBottom: 5}}>
                  <List.Item
                    theme={theme}
                    title={_comment.user.name}
                    description={_comment.body}
                    right={_props => {
                      return (
                        <List.Icon
                          {..._props}
                          icon={__props => <Feather name="edit" {...__props} />}
                        />
                      );
                    }}
                  />
                </View>
              );
            },
          )}
        </>
      )}
      <Snackbar
        duration={10000}
        onDismiss={() => {
          setMessage('');
        }}
        visible={Boolean(message)}>
        {message}
      </Snackbar>
    </Screen>
  );
};

const styles = StyleSheet.create<{[key: string]: ViewStyle | TextStyle}>({
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
