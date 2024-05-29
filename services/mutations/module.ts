import {useAuth} from '@components/authentication/Provider';
import {postModuleUserProgress} from '@services/api/module';
import {ModuleUserProgress} from '@services/types';
import {useMutation} from 'react-query';

const useModuleUserProgress = () => {
  const {accessToken} = useAuth();

  return useMutation(async (options: ModuleUserProgress) => {
    return postModuleUserProgress(accessToken, options);
  });
};

export {useModuleUserProgress};
