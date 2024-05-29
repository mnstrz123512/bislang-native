import axios, {baseURL} from '../../apiClient';

const signInViaGoogle = async (idToken: string): Promise<any> => {
  try {
    const response = await axios.post(`${baseURL}/auth/sign_in_with_google/`, {
      id_token: idToken,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${baseURL}/auth/login/`, {
      username: email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getBadges = async (
  accessToken: string | null | undefined
): Promise<any> => {
  const headers: Record<string, string> = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(`${baseURL}/auth/achievements/badges/`, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {signInViaGoogle, signIn, getBadges};
