declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  import { FunctionComponent } from 'react';

  const content: FunctionComponent<SvgProps>;
  export default content;
}
