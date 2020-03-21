import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Title} from '@components/typography';
import {Icons} from '@theme/icons';
import {useTheme} from '@theme';
import {ActionType} from '@interfaces';

interface HeaderProps {
  children?: React.ReactNode;
  renderBackAction?: () => React.ReactElement;
  title?: string;
}
interface HeaderButton extends TouchableOpacityProps {
  size?: number;
  color?: string;
  icon: 'settings' | 'chevron';
}

type HeaderButtonType = React.FunctionComponent<HeaderButton>;
type HeaderContentType = React.FunctionComponent<{title: string}>;
type HeaderBackButtonType = React.FunctionComponent<{onPress: () => void}>;
type HeaderType = React.FunctionComponent<HeaderProps> & {
  Button: HeaderButtonType;
  BackAction?: HeaderBackButtonType;
  Content?: HeaderContentType;
};

const HeaderButton: HeaderButtonType = ({icon, size, color, ...props}) => {
  const SvgIcon = Icons[icon];
  return (
    <TouchableOpacity {...props}>
      <SvgIcon.default width={size} height={size} color={color} fill={color} />
    </TouchableOpacity>
  );
};

const HeaderContent: HeaderContentType = ({title}) => {
  const theme = useTheme();
  return (
    <Title
      weight="black"
      style={{
        marginBottom: theme.spacing.medium,
        color: theme.colors.text,
      }}>
      {title || 'Help!'}
    </Title>
  );
};

const HeaderBackAction: HeaderBackButtonType = ({onPress}) => {
  const theme = useTheme();
  return (
    <HeaderButton
      icon="chevron"
      size={20}
      color={theme.colors.text}
      onPress={onPress}
    />
  );
};

const Header: HeaderType = ({children, title, renderBackAction}) => {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.row}>
        {renderBackAction && renderBackAction()}
        <Title
          weight="black"
          style={{
            marginBottom: theme.spacing.medium,
            color: theme.colors.text,
          }}>
          {title || 'Help!'}
        </Title>
      </View>
      {children}
    </View>
  );
};

Header.Button = HeaderButton;
Header.Content = HeaderContent;
Header.BackAction = HeaderBackAction;

export default Header;

const styles = StyleSheet.create<{row: ViewStyle}>({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
