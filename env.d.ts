declare module '@env' {
  export const APP_API_URL: string;
  export const GOOGLE_CLIENT_ID: string;
}
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
