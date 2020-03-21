import * as React from 'react';
import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {Button, Form, Header, Label, PostType, Screen, Text} from '@components';
import {useTheme} from '@theme';
import {useSafeArea} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ActionType, PostUtilsStore, ReduxState} from '@interfaces';
import {useState} from 'react';
import {COLORS} from '@styles';
import HelpApi from '@services/http';
import Geolocation from '@react-native-community/geolocation';

type PostPostRequest = {
  title: string;
  body: string;
  type_id: string;
  offer_help: boolean;
};

const submitPost: (data: PostPostRequest) => void = data => {
  const fd = new FormData();
  for (let [key, value] of Object.entries(data)) {
    fd.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  Geolocation.getCurrentPosition(
    async r => {
      try {
        fd.append('latitude', JSON.stringify(r.coords.latitude));
        fd.append('longitude', JSON.stringify(r.coords.longitude));
        const response = await HelpApi.post('/posts', fd, {
          headers: {'Content-Type': 'multipart/form-data'},
        });
        console.log(response);
        // TODO: if success navigate to post screen
      } catch (e) {
        console.log(e.response || e);
      }
    },
    e => {
      console.log(e);
    },
    {
      enableHighAccuracy: true,
    },
  );
};

export const AddPostScreen: React.FunctionComponent = () => {
  const [selected, setSelected] = useState<string>('1');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const {top} = useSafeArea();
  const {types} = useSelector<ReduxState, PostUtilsStore>(
    state => state.postUtils,
  );

  return (
    <Screen type="static" style={{paddingTop: top + theme.spacing.medium}}>
      <Header title="New Post:">
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
      <Form
        style={{
          paddingHorizontal: theme.spacing.medium,
          paddingTop: theme.spacing.large,
        }}>
        <Label weight="bold" style={{marginBottom: theme.spacing.medium}}>
          Post Type (Please select ONE type):
        </Label>
        {types.length ? (
          <View style={styles.row}>
            {types.map((type, i) => (
              <PostType
                key={i}
                selected={selected === type.id}
                type={type}
                onPress={() => setSelected(type.id ? type.id : '0')}
                typeStyle={{
                  color:
                    selected === type.id ? COLORS.white : theme.colors.text,
                }}
              />
            ))}
          </View>
        ) : (
          <View style={styles.row}>
            <PostType
              selected={selected === '1'}
              onPress={() => setSelected('1')}
              type={{
                id: '1',
                name: 'general',
              }}
              typeStyle={{
                color: selected === '1' ? COLORS.white : theme.colors.text,
              }}
            />
            <PostType
              selected={selected === '2'}
              onPress={() => setSelected('2')}
              type={{
                id: '2',
                name: 'food',
              }}
              typeStyle={{
                color: selected === '2' ? COLORS.white : theme.colors.text,
              }}
            />
            <PostType
              selected={selected === '3'}
              onPress={() => setSelected('3')}
              type={{
                id: '3',
                name: 'teaching',
              }}
              typeStyle={{
                color: selected === '3' ? COLORS.white : theme.colors.text,
              }}
            />
          </View>
        )}
        <Label weight="black" style={{marginBottom: theme.spacing.medium}}>
          Title
        </Label>
        <TextInput
          placeholder="Type your post title here..."
          placeholderTextColor={theme.colors.disabled}
          value={title}
          onChangeText={setTitle}
          style={{
            color: theme.colors.text,
            fontSize: 19,
            ...theme.fonts.regular,
            borderBottomWidth: 0.3,
            borderBottomColor: theme.colors.text,
            marginBottom: theme.spacing.medium,
          }}
        />
        <Label weight="black" style={{marginBottom: theme.spacing.medium}}>
          Body
        </Label>
        <TextInput
          placeholder="Type your post body here..."
          multiline
          value={body}
          onChangeText={setBody}
          placeholderTextColor={theme.colors.disabled}
          style={{
            minHeight: 100,
            color: theme.colors.text,
            fontSize: 19,
            textAlignVertical: 'top',
            ...theme.fonts.regular,
            borderBottomWidth: 0.3,
            borderBottomColor: theme.colors.text,
            marginBottom: theme.spacing.large,
          }}
        />
        <Button
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            submitPost({
              type_id: selected,
              title,
              body,
              offer_help: true,
            });
          }}
          loadingColor={theme.colors.background}
          loadingSize={24}>
          <Text
            weight="bold"
            style={{
              color: theme.colors.background,
              textTransform: 'uppercase',
              paddingHorizontal: theme.spacing.medium,
            }}>
            Submit
          </Text>
        </Button>
      </Form>
    </Screen>
  );
};

type AddPostStyle = {
  row?: ViewStyle;
};
const styles = StyleSheet.create<AddPostStyle>({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
