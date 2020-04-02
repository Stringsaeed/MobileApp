import * as React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from 'react-native-confirmation-code-field';
import {FunctionComponent, useEffect, useState} from 'react';
import {Header, Label, Screen, Text, Title} from '@components';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamsList} from '@interfaces';
import {useTheme} from '@theme';
import {useSafeArea} from 'react-native-safe-area-context';
import HelpApi from '@services/http';
import AsyncStorage from '@react-native-community/async-storage';
import Auth from '@react-native-firebase/auth';
import {Button, Modal, Snackbar, Portal} from 'react-native-paper';

interface VSCodeProps {
  visible: boolean;
  phone?: string;
  dismiss: () => void;
  onPressConfirm: (code: string) => void;
}

type VSCodeType = FunctionComponent<VSCodeProps>;

export const VerificationCodeScreen: VSCodeType = ({
  visible,
  phone,
  onPressConfirm,
  dismiss,
}) => {
  const [value, setValue] = useState('');
  // const ref = useBlurOnFulfill({value, cellCount: 6});
  // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
  //   value,
  //   setValue,
  // });
  const theme = useTheme();
  const {top} = useSafeArea();

  return (
    <Portal>
      <Modal
        contentContainerStyle={{flex: 1}}
        dismissable
        onDismiss={dismiss}
        visible={visible}>
        <Screen type="static" style={{paddingTop: top + theme.spacing.medium}}>
          <Header title="Verification" />
          <Text weight="regular">
            Verification Code has been sent to{' '}
            <Text weight="bold">{phone}</Text>
          </Text>
          {/*<CodeField*/}
          {/*  ref={ref}*/}
          {/*  {...props}*/}
          {/*  value={value}*/}
          {/*  onChangeText={setValue}*/}
          {/*  cellCount={6}*/}
          {/*  rootStyle={styles.codeFiledRoot}*/}
          {/*  keyboardType="number-pad"*/}
          {/*  renderCell={({index, symbol, isFocused}) => (*/}
          {/*    <Text*/}
          {/*      weight="bold"*/}
          {/*      key={index}*/}
          {/*      style={[styles.cell, isFocused && styles.focusCell]}*/}
          {/*      onLayout={getCellOnLayoutHandler(index)}>*/}
          {/*      {symbol || (isFocused ? <Cursor /> : null)}*/}
          {/*    </Text>*/}
          {/*  )}*/}
          {/*/>*/}
          <Button
            compact
            theme={theme}
            mode="contained"
            style={{width: '50%', alignSelf: 'center'}}
            onPress={() => {
              onPressConfirm(value);
            }}>
            Confirm
          </Button>
        </Screen>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create<{[key: string]: ViewStyle | TextStyle}>({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20, marginBottom: 30, paddingHorizontal: 15},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
