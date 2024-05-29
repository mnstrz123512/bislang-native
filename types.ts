type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Dashboard: undefined;
  Module: undefined;
  Game: undefined;
  Profile: undefined;
};

type PageListParams = {
  module_id: number;
  screenOptions?: {
    title: string;
  };
};

type PageParams = {
  module_id: number;
  page_id: number;
  audio: string;
  screenOptions?: {
    title: string;
  };
};

type ModuleStackParamList = {
  List: undefined;
  PageList: PageListParams;
  Page: PageParams;
};

type GameStackParamList = {
  TypeList: undefined;
  List: ListParams;
  PlayGame: PlayGameParams;
};

type ListParams = {
  type: number;
  title: string;
  subTitle: string;
};

interface PlayGameParams extends ListParams {
  id: number;
  type: number;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export type {
  RootStackParamList,
  ModuleStackParamList,
  User,
  AuthToken,
  GameStackParamList,
  ListParams,
  PlayGameParams,
  PageListParams,
  PageParams,
};
