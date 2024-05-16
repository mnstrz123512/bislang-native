import {UserProgressProps} from '@services/types';
import axios, {baseURL} from '../../apiClient';

const getGameTypes = async (
  accessToken: string | null | undefined
): Promise<any> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(`${baseURL}/games/type/`, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getGames = async (
  accessToken: string | null | undefined,
  params: Record<string, string>
): Promise<any> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(`${baseURL}/games`, {
      headers,
      params,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getGameDetail = async (
  accessToken: string | null | undefined,
  id: number
): Promise<any> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(`${baseURL}/games/${id}`, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postUserProgress = async (
  accessToken: string | null | undefined,
  options: UserProgressProps
): Promise<any> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.post(
      `${baseURL}/games/progress/`,
      {
        is_completed: options.is_completed,
        game: options.id,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {getGameTypes, getGames, getGameDetail, postUserProgress};
