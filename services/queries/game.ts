import {useQuery} from 'react-query';
import {getGameDetail, getGameTypes, getGames} from '../api/game';
import {useAuth} from '@components/authentication/Provider';

const useGameTypes = () => {
  const {accessToken} = useAuth();
  return useQuery('game_types', () => getGameTypes(accessToken));
};

const useGames = (type: number) => {
  const {accessToken} = useAuth();
  return useQuery('games', () =>
    getGames(accessToken, {
      type: type.toString(),
    })
  );
};

const useGameDetails = (id: number) => {
  const {accessToken} = useAuth();
  return useQuery(['game', id], () => getGameDetail(accessToken, id));
};

export {useGameTypes, useGames, useGameDetails};
