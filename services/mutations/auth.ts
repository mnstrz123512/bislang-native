import {useMutation} from 'react-query';
import {signInViaGoogle, signIn} from '../api/auth';

const useSignInViaGoogle = () => {
  return useMutation(async (idToken: string) => {
    return signInViaGoogle(idToken);
  });
};

const useSignIn = () => {
  return useMutation(
    async ({email, password}: {email: string; password: string}) => {
      return signIn(email, password);
    }
  );
};

export {useSignInViaGoogle, useSignIn};
