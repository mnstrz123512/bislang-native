import {useQuery} from 'react-query';
import {useAuth} from '@components/authentication/Provider';
import {getBadges} from '@services/api/auth';

const useBadges = () => {
  const {accessToken} = useAuth();
  return useQuery('badges', () => getBadges(accessToken));
};

export {useBadges};
