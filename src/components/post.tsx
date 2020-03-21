import * as React from 'react';
import {COLORS} from '@styles';
import {useTheme} from '@theme';
import {Icons} from '@theme/icons';
import {Post} from '@interfaces/post';
import ReadMore from 'react-native-read-more-text';
import {Caption, PostType, Text} from '@components/typography';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
dayjs.extend(RelativeTime);

interface PostStyle {
  container?: ViewStyle;
  title?: TextStyle;
  type?: ViewStyle;
  body?: TextStyle;
  date?: TextStyle;
  row?: ViewStyle;
}
interface PostProps {
  item: Post;
}

type PostComponentType = React.FunctionComponent<PostProps & PostStyle>;

export const PostComponent: PostComponentType = ({
  item,
  container,
  title,
  type,
  date,
  body,
}) => {
  const theme = useTheme();
  const CommentIcon = Icons.comment;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const readableDate = dayjs(dayjs.unix(item.created_at)).fromNow();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.push('@POST_SCREEN', {
          item: item,
        })
      }
      style={[styles.container, {borderColor: theme.colors.text}, container]}>
      <Text weight="regular">
        <Text weight="bold">{item.user && item.user.name}</Text> in{' '}
        <PostType type={item.type} typeStyle={type} />
      </Text>
      <Text weight="bold" style={[styles.title, title]}>
        {item.title}
      </Text>
      <View style={{paddingHorizontal: 8}}>
        <ReadMore
          numberOfLines={4}
          renderTruncatedFooter={() => {
            return (
              <Caption
                weight="bold"
                onPress={() => {}}
                style={{color: COLORS.readMore}}>
                Read More
              </Caption>
            );
          }}>
          <Text
            weight="medium"
            ellipsizeMode="clip"
            style={[styles.body, body]}>
            {item.body}
          </Text>
        </ReadMore>
      </View>
      <View style={{marginBottom: 16}} />
      <View style={styles.row}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CommentIcon fill={theme.colors.text} width={20} height={20} />
          <Text weight="regular">{item.comments}</Text>
        </View>
        <Caption
          weight="light"
          style={[styles.date, {color: theme.colors.text}, date]}>
          {readableDate}
        </Caption>
      </View>
    </TouchableOpacity>
  );
};

/** post component styles */

const styles = StyleSheet.create<PostStyle>({
  container: {
    borderWidth: 0.3,
    borderRadius: 20,
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 8,
    paddingVertical: 10,
  },
  title: {
    fontSize: 21,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  type: {
    backgroundColor: COLORS.category,
    borderRadius: 50,
    padding: 4,
    paddingHorizontal: 8,
    width: 'auto',
    fontFamily: 'RobotoMono-Medium',
    color: COLORS.white,
    textTransform: 'capitalize',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  body: {
    textAlign: 'left',
    marginBottom: 16,
    paddingLeft: 4,
  },
  date: {
    // padding: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
});
