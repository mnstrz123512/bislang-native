type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Dashboard: undefined;
  Module: undefined;
};

type ModuleStackParamList = {
  List: undefined;
  Page: undefined;
  SubModule: {
    screenOptions?: {
      title: string;
    };
  };
};

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export type {RootStackParamList, ModuleStackParamList, User, AuthToken};
