import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {
  Caption,
  Form,
  Header,
  Label,
  PostType,
  Screen,
  Text,
} from '@components';
import {useTheme} from '@theme';
import {useSafeArea} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ActionType, ParamsList, PostUtilsStore, ReduxState} from '@interfaces';
import {useState} from 'react';
import {COLORS} from '@styles';
import HelpApi from '@services/http';
import Geolocation from '@react-native-community/geolocation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Post} from '@interfaces/post';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Switch, Button} from 'react-native-paper';

type PostPostRequest = {
  title: string;
  body: string;
  type_id: string;
  offer_help: boolean;
};

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(2)
    .label('Title')
    .required(),
  body: yup
    .string()
    .min(6)
    .label('Post Body')
    .required(),
});

const submitPost: (
  data: PostPostRequest,
  onSuccess: (item: Post) => void,
  onError: () => void,
) => void = (data, onSuccess, onError) => {
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
        onSuccess(response.data.data);
      } catch (e) {
        onError();
        console.log(e.response || e);
      }
    },
    e => {
      console.log(e);
      onError();
    },
    {
      timeout: 300,
    },
  );
};

export const AddPostScreen: React.FunctionComponent<{
  navigation: BottomTabNavigationProp<ParamsList>;
}> = ({navigation}) => {
  const [offerHelp, setOfferHelp] = useState<boolean>(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const {top} = useSafeArea();
  const postUtilsStore = useSelector<ReduxState, PostUtilsStore>(
    state => state.postUtils,
  );
  const [selected, setSelected] = useState<string>(
    postUtilsStore.types[0].id || '',
  );
  console.log(postUtilsStore);

  const formik = useFormik<{
    title: string;
    body: string;
  }>({
    validationSchema,
    // validateOnBlur: true,
    onSubmit: (values, formikHelpers) => {
      submitPost(
        {
          type_id: selected,
          title: values.title,
          body: values.body,
          offer_help: true,
        },
        item => {
          formikHelpers.setSubmitting(false);
          navigation.navigate('@POST_SCREEN', {
            item: item,
          });
        },
        () => {
          formikHelpers.setSubmitting(false);
        },
      );
    },
    initialValues: {
      title: '',
      body: '',
    },
  });

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
        <View style={styles.row}>
          {postUtilsStore.types.map(type => (
            <View
              key={type.id}
              style={{borderRadius: 50, overflow: 'hidden', height: 'auto'}}>
              <PostType
                selected={selected === type.id}
                type={type}
                onPress={() => setSelected(type.id ? type.id : '0')}
                typeStyle={{
                  borderRadius: 0,
                  marginBottom: 0,
                  color:
                    selected === type.id ? COLORS.white : theme.colors.text,
                }}
              />
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Label weight="black">Offer Help ?</Label>
          <Switch
            value={offerHelp}
            color={theme.colors.primary}
            onValueChange={() => setOfferHelp(!offerHelp)}
          />
        </View>
        <Label
          weight="black"
          style={{
            color:
              formik.touched.title && formik.errors.title
                ? COLORS.error
                : theme.colors.text,
            marginBottom: theme.spacing.medium,
          }}>
          Title
        </Label>
        <TextInput
          placeholder="Type your post title here..."
          placeholderTextColor={theme.colors.disabled}
          value={formik.values.title}
          onChangeText={text => formik.setFieldValue('title', text)}
          onBlur={() => formik.setFieldTouched('title', true)}
          style={{
            color: theme.colors.text,
            fontSize: 19,
            ...theme.fonts.regular,
            borderBottomWidth: 0.35,
            paddingBottom: theme.spacing.small,
            borderBottomColor:
              formik.touched.title && formik.errors.title
                ? COLORS.error
                : theme.colors.text,
            marginBottom: theme.spacing.medium,
          }}
        />
        {formik.touched.title && formik.errors.title ? (
          <Caption weight="regular" style={{color: COLORS.error}}>
            {formik.errors.title}
          </Caption>
        ) : null}
        <Label
          weight="black"
          style={{
            color:
              formik.touched.body && formik.errors.body
                ? COLORS.error
                : theme.colors.text,
            marginBottom: theme.spacing.medium,
          }}>
          Body
        </Label>
        <TextInput
          placeholder="Type your post body here..."
          multiline
          value={formik.values.body}
          onChangeText={text => formik.setFieldValue('body', text)}
          onBlur={() => formik.setFieldTouched('body', true)}
          placeholderTextColor={theme.colors.disabled}
          style={{
            minHeight: 100,
            color: theme.colors.text,
            fontSize: 19,
            textAlignVertical: 'top',
            ...theme.fonts.regular,
            borderBottomWidth: 0.3,
            borderBottomColor:
              formik.touched.body && formik.errors.body
                ? COLORS.error
                : theme.colors.text,
            marginBottom: theme.spacing.large,
          }}
        />
        {formik.touched.body && formik.errors.body ? (
          <Caption weight="regular" style={{color: COLORS.error}}>
            {formik.errors.body}
          </Caption>
        ) : null}

        <Button
          theme={theme}
          loading={formik.isSubmitting}
          mode="contained"
          style={{
            // backgroundColor: theme.colors.primary,
            alignSelf: 'flex-end',
            borderRadius: 50,
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
          }}
          disabled={
            !formik.isValid ||
            !(formik.touched.title || formik.touched.body) ||
            (Boolean(formik.errors.title) && Boolean(formik.errors.body))
          }
          onPress={formik.handleSubmit}
          color={theme.colors.primary}>
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
    marginBottom: 16,
  },
});
