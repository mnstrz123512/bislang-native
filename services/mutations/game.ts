import {useAuth} from '@components/authentication/Provider';
import {postGameUserProgress} from '@services/api/game';
import {UserProgressProps} from '@services/types';
import {useMutation} from 'react-query';

const useGameUserProgress = () => {
  const {accessToken} = useAuth();

  return useMutation(async (options: UserProgressProps) => {
    return postGameUserProgress(accessToken, options);
  });
};

export {useGameUserProgress};
