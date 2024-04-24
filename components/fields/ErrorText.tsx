import {Text} from 'react-native-paper';
import React from 'react';
import styled from '@emotion/native';

const Error = styled(Text)`
  color: #f00;
`;

interface ErrorTextProps {
  error?: string;
  dirty?: boolean;
}

const ErrorText = ({error, dirty}: ErrorTextProps) => {
  return error && dirty ? <Error>{error}</Error> : null;
};

export default ErrorText;
