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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useSignIn, useSignInViaGoogle} from '@services/mutations/auth';
import {useAuth} from './Provider';

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

GoogleSignin.configure({
  webClientId:
    '66921506597-e2pd8rqlakq4c0tkd1b65lhf6s0ftldg.apps.googleusercontent.com',
  offlineAccess: true,
});

const LoginForm = () => {
  const navigate = useNavigation<LoginFormNavigationProp>();
  const signInWithGoogle = useSignInViaGoogle();
  const signIn = useSignIn();
  const {processLogin} = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: () => {
      const {username, password} = formik.values;
      signIn.mutateAsync({email: username, password}).then(response => {
        processLogin(response).then(() => {
          if (response) {
            navigate.replace('Dashboard');
          }
        });
      });
    },
  });
  const {handleSubmit} = formik;

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {idToken} = userInfo;

      if (!idToken) {
        throw new Error('No idToken');
      }

      const response = await signInWithGoogle.mutateAsync(idToken);
      processLogin(response);

      if (response) {
        navigate.replace('Dashboard');
      }

      // Handle the signed in user info accordingly
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in progress');
      } else {
        // some other error happened
        console.log('error', error.message);
      }
    }
  };

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
          <Button onPress={handleGoogleSignIn} icon={'google'}>
            Sign in with Google
          </Button>
        </SignInOptions>
      </FormContainer>
    </FormikProvider>
  );
};

export default LoginForm;
