import {View, Modal} from 'react-native';
import styled from '@emotion/native';
import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {FormikProvider, useFormik} from 'formik';
import InputField from '../fields/InputField';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
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

const CloseButton = styled(Button)`
  margin-top: 20px;
  width: 50%;
  align-self: center;
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
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

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

        <Button onPress={() => setForgotPasswordModalVisible(true)}>
          Forgot your password?
        </Button>

        <SignInOptions>
          <Button onPress={handleGoogleSignIn} icon={'google'}>
            Sign in with Google
          </Button>
        </SignInOptions>
      </FormContainer>

      <Modal visible={forgotPasswordModalVisible} onDismiss={() => setForgotPasswordModalVisible(false)} transparent>
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    <View style={{backgroundColor: 'white', padding: 30, borderRadius: 20}}>
      <Text adjustsFontSizeToFit minimumFontScale={0.5}>Forgot Password?</Text>
      <Text adjustsFontSizeToFit minimumFontScale={0.5}> </Text>
      <Text adjustsFontSizeToFit minimumFontScale={30}>"Kindly contact bislang@gmail.com for assistance with resetting your password."</Text>
      {/* Add your forgot password form here */}
      <Button onPress={() => setForgotPasswordModalVisible(false)}>Close</Button>
    </View>
  </View>
</Modal>
    </FormikProvider>
  );
};

export default LoginForm;
