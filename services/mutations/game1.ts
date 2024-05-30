import {useAuth} from '@components/authentication/Provider';
import {postUserProgress} from '@services/api/game';
import {UserProgressProps} from '@services/types';
import {useMutation} from 'react-query';

const useUserProgress1 = () => {
  const {accessToken} = useAuth();

  return useMutation(async (options: UserProgressProps) => {
    return postUserProgress(accessToken, options);
  });
};

export {useUserProgress1};