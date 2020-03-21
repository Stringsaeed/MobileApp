import * as React from 'react';
import {useTheme} from '@theme';
import HelpApi from '@services/http';
import {Post} from '@interfaces/post';
import {Snackbar} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Label, PostComponent, Screen, Title, Text, Form} from '@components';
import {StackNavigationProp, useHeaderHeight} from '@react-navigation/stack';

type ParamsList = {
  '@POST_SCREEN': {
    item: Post;
  };
};
interface PostProps {
  navigation: StackNavigationProp<ParamsList, '@POST_SCREEN'>;
  route: RouteProp<ParamsList, '@POST_SCREEN'>;
}
type PostScreenType = React.FunctionComponent<PostProps>;

export const PostScreen: PostScreenType = ({route}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const headerHeight = useHeaderHeight();
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
    }
  }, [item.id]);

  const submitComment = useCallback(async () => {
    await HelpApi.post(`/posts/${item.id}/comments`, {
      body: comment,
    });
    setMessage('Commented Successfully');
    setComment('');
    getPost();
  }, [comment, getPost, item.id]);

  useEffect(() => {
    getPost().then(r => console.log(r));
  }, [getPost]);

  return (
    <Screen type="static" style={{paddingTop: headerHeight}}>
      <PostComponent item={route.params.item} />
      <View
        style={{
          paddingHorizontal: theme.spacing.medium,
          marginBottom: theme.spacing.large,
        }}>
        <Title weight="bold">{item.title}</Title>
        <Text weight="regular">{item.body}</Text>
      </View>
      <View />
      {isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Label weight="bold">Comments:</Label>
          <Form.Item
            label="Add comment"
            placeholder="place your comment here"
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={() => {
              submitComment();
            }}
          />
          <FlatList
            data={data.comments}
            renderItem={({item}: {item: any}) => {
              return <View />;
            }}
          />
        </View>
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
