import {View} from 'react-native';
import styled from '@emotion/native';
import React from 'react';
import {Button} from 'react-native-paper';
// import { loginValidation } from './validation';
import {FormikProvider, useFormik} from 'formik';
import InputField from '../fields/InputField';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// import { Image } from 'expo-image';
// import useIsMobile from '@/hooks/useIsMobile';
import {RootStackParamList} from '../../types';

const LoginButton = styled(Button)`
  margin-top: 20px;
`;

const FormContainer = styled.View`
  width: 100%;
  gap: 20px;
`;
const SignInOptions = styled.View`
  gap: 20px;
  align-items: center;
`;
type LoginFormNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginForm = () => {
  const navigate = useNavigation<LoginFormNavigationProp>();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: () => {
      navigate.navigate('Dashboard');
    },
    // validationSchema: loginValidation,
  });
  const {handleSubmit} = formik;

  return (
    <FormikProvider value={formik}>
      <FormContainer>
        <InputField name="username" label="Username" />
        <InputField name="password" label="Password" secureTextEntry />
        <LoginButton onPress={() => handleSubmit()} mode="contained">
          Login
        </LoginButton>

        <View>
          <Button>Forgot your password?</Button>
          <Button
            onPress={() => {
              // navigate.navigate('Register')
            }}>
            Don't have an account?
          </Button>
        </View>

        <SignInOptions>
          <Button icon={'google'}>Sign in with Google</Button>
        </SignInOptions>
      </FormContainer>
    </FormikProvider>
  );
};

export default LoginForm;
