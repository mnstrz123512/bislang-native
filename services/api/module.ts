import {ModuleUserProgress} from '@services/types';
import axios, {baseURL} from '../../apiClient';

const getModules = async (accessToken: string | null | undefined) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(`${baseURL}/modules`, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getPages = async (
  accessToken: string | null | undefined,
  params: Record<string, string>
) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(
      `${baseURL}/modules/${params.module_id}/pages`,
      {
        headers,
        params,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getPage = async (
  accessToken: string | null | undefined,
  params: Record<string, string>
) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.get(
      `${baseURL}/modules/${params.module_id}/pages/${params.page_id}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postModuleUserProgress = async (
  accessToken: string | null | undefined,
  options: ModuleUserProgress
) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios.post(
      `${baseURL}/modules/${options.module_id}/pages/${options.page_id}/progress/`,
      {
        is_completed: options.is_completed,
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

export {getModules, getPages, getPage, postModuleUserProgress};
