import * as React from 'react';
import {useTheme} from '@theme';
import HelpApi from '@services/http';
import {Post} from '@interfaces/post';
import {Snackbar, TextInput} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import color from 'color';
import {ActivityIndicator, View, ViewStyle} from 'react-native';
import {Label, Screen, Form, Text} from '@components';
import {PostComponent} from '@components/newPost';
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

  const renderRight = (_props: {size?: number; color?: string}) => (
    <List.Icon
      {..._props}
      icon={__props => <Feather name="edit" {...__props} />}
    />
  );

  return (
    <Screen
      type="scroll"
      // style={{paddingHorizontal: 0}}
      contentContainerStyle={{
        flex: 1,
        paddingTop: 0,
      }}>
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
          <List.Section
            style={{
              backgroundColor: color(theme.colors.surface)
                .mix(color('white'), 0.07)
                .hex(),
            }}>
            <List.Subheader>Comments</List.Subheader>
            <TextInput
              label="Add comment"
              dense
              value={comment}
              mode="outlined"
              onChangeText={setComment}
              onSubmitEditing={() => {
                submitComment();
              }}
              style={{marginHorizontal: theme.spacing.medium}}
            />
            {data.comments instanceof Array && data.comments.length ? (
              data.comments.map(
                (_comment: {
                  id: string;
                  user: {name: string; id: string};
                  body: string;
                }) => {
                  return (
                    <List.Item
                      key={_comment.id}
                      title={_comment.user.name}
                      description={_comment.body}
                      style={{borderBottomWidth: 0.4}}
                      right={renderRight}
                    />
                  );
                },
              )
            ) : (
              <View>
                <Text weight="bold" style={{alignSelf: 'center'}}>
                  This post has no comments
                </Text>
              </View>
            )}
          </List.Section>
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
