import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

interface AuthState extends User {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface User {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  profileImage: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

interface AuthContextProps extends Partial<AuthState> {
  dispatch: React.Dispatch<Action>;
  loadAuth: () => Promise<void>;
  logout: () => Promise<void>;
  processLogin: (response: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    access_token: string;
    refresh_token: string;
  }) => Promise<void>;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  profileImage: '',
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        emailAddress: action.payload?.emailAddress,
        profileImage: action.payload?.profileImage,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        firstName: null,
        lastName: null,
        emailAddress: null,
        profileImage: null,
        accessToken: null,
        refreshToken: null,
      };
    case 'LOAD_AUTH':
      return {
        ...state,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        emailAddress: action.payload?.emailAddress,
        profileImage: action.payload?.profileImage,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        isAuthenticated: action.payload?.accessToken ? true : false,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadAuth = async () => {
    try {
      const data = await AsyncStorage.multiGet([
        'emailAddress',
        'firstName',
        'lastName',
        'profileImage',
        'accessToken',
        'refreshToken',
      ]);

      const {
        emailAddress,
        firstName,
        lastName,
        profileImage,
        accessToken,
        refreshToken,
      } = Object.fromEntries(data);

      dispatch({
        type: 'LOAD_AUTH',
        payload: {
          emailAddress,
          firstName,
          lastName,
          profileImage,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'emailAddress',
        'firstName',
        'lastName',
        'profileImage',
        'accessToken',
        'refreshToken',
      ]);

      dispatch({type: 'LOGOUT'});
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  const processLogin = async (response: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
    access_token: string;
    refresh_token: string;
  }) => {
    AsyncStorage.multiSet([
      ['emailAddress', response.email],
      ['firstName', response.first_name],
      ['lastName', response.last_name],
      ['profileImage', response.profile_image],
      ['accessToken', response.access_token],
      ['refreshToken', response.refresh_token],
    ]);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        emailAddress: response.email,
        firstName: response.first_name,
        lastName: response.last_name,
        profileImage: response.profile_image,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      },
    });
  };

  const payload = {
    ...state,
    loadAuth,
    dispatch,
    logout,
    processLogin,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
