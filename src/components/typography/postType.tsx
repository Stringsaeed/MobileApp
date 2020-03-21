import {COLORS} from '@styles';
import * as React from 'react';
import {useTheme} from '@theme';
import {Text} from '@components';
import {PostTypeInterface} from '@interfaces';
import {StyleSheet, TextProps, TextStyle} from 'react-native';

interface PostTypeProps extends TextProps {
  typeStyle?: TextStyle;
  type: PostTypeInterface;
  selected?: boolean;
}
type PostTypeType = React.FunctionComponent<PostTypeProps>;

export const PostType: PostTypeType = ({
  type,
  typeStyle,
  selected,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Text
      weight="regular"
      style={[
        styles.type,
        {
          backgroundColor: selected
            ? type.name && COLORS[type.name.toLowerCase()]
            : undefined,
          color: selected
            ? COLORS.white
            : (type.name && theme.colors[type.name.toLowerCase()]) ||
              theme.colors.text,
        },
        typeStyle,
      ]}
      {...props}>
      # {type.name}
    </Text>
  );
};
// type.name && COLORS[type.name.toLowerCase()]
const styles = StyleSheet.create<{type: TextStyle}>({
  type: {
    // backgroundColor: COLORS.category,
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
});
