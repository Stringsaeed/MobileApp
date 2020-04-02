import * as React from 'react';
import {useTheme} from '@theme';
import {Icons} from '@theme/icons';
import {Post} from '@interfaces/post';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import {
  Card,
  Paragraph,
  Button,
  Caption,
  Title,
  Subheading,
} from 'react-native-paper';
import {View, ViewStyle} from 'react-native';

dayjs.extend(RelativeTime);

interface PostProps {
  item: Post;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

type PostComponentType = React.FunctionComponent<PostProps>;

export const PostComponent: PostComponentType = ({
  item,
  onPress,
  containerStyle,
}) => {
  const theme = useTheme();
  const CommentIcon = Icons.comment;
  const readableDate = dayjs(dayjs.unix(item.created_at)).fromNow();
  return (
    <Card
      style={{
        marginBottom: theme.spacing.medium,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Card.Content style={{padding: theme.spacing.medium}}>
        <Subheading
          style={{
            color: theme.colors.primary,
          }}>{`${item.user && item.user.name} in # ${
          item.type.name
        }`}</Subheading>
        <Title>{item.title}</Title>
        <Paragraph>{item.body}</Paragraph>
      </Card.Content>
      <Card.Actions style={{justifyContent: 'space-between'}}>
        <Button>
          <Caption>{readableDate}</Caption>
        </Button>
        <Button
          onPress={() => {}}
          icon={_props => (
            <CommentIcon
              fill={_props.color}
              width={_props.size}
              height={_props.size}
              {..._props}
            />
          )}>
          {item.comments}
        </Button>
      </Card.Actions>
    </Card>
  );
};
