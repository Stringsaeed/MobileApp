declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'react-native-read-more-text' {
  import * as React from 'react';
  class ReadMore extends React.Component<any, any> {
    constructor();
  }
  export = ReadMore;
}
