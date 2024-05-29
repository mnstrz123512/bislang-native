import {useQuery} from 'react-query';
import {getModules, getPage, getPages} from '../api/module';
import {useAuth} from '@components/authentication/Provider';

const useModules = () => {
  const {accessToken} = useAuth();
  return useQuery('modules', () => getModules(accessToken));
};

const usePages = (moduleId: number) => {
  const {accessToken} = useAuth();
  return useQuery('pages', () =>
    getPages(accessToken, {
      module_id: moduleId.toString(),
    })
  );
};

const usePage = (moduleId: number, pageId: number) => {
  const {accessToken} = useAuth();
  return useQuery(['page', pageId], () =>
    getPage(accessToken, {
      module_id: moduleId.toString(),
      page_id: pageId.toString(),
    })
  );
};

export {useModules, usePages, usePage};
