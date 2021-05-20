import axios, { AxiosResponse } from "axios";
import { fetchEnvVar } from "../../utils/env_helper";

export const asyncGetRequest = async (
  url: string,
  params?: string[]
): Promise<AxiosResponse> => {
  return await axios
    .get(url, { params: { ...params, apiKey: fetchEnvVar("API_KEY") } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.status === 404) {
        return error;
      } else {
        throw new Error(error);
      }
    });
};

export const asyncPostRequest = async (
  url: string,
  data: object
): Promise<AxiosResponse> => {
  return await axios
    .post(url, data, { params: { apiKey: fetchEnvVar("API_KEY") } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const asyncPutRequest = async (
  url: string,
  data: object
): Promise<AxiosResponse> => {
  return await axios
    .put(url, data, { params: { apiKey: fetchEnvVar("API_KEY") } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const getProject = async (
  projectId: string
): Promise<NpmProject | { error: string }> => {
  return await asyncGetRequest(
    `${fetchEnvVar("PROJECTS_ENDPOINT")}/${projectId}`
  )
    .then((response) => {
      return {
        projectName: response.data["projectName"],
        packageJsonUrl: response.data.projectType.npm.packageJsonUrl,
        packageLockUrl: response.data.projectType.npm.packageLockUrl,
      };
    })
    .catch((error) => {
      return error;
    });
};

export const updateProject = async (
  projectId: string,
  scannedDependencies: ScannedDependency[]
): Promise<AxiosResponse> => {
  return await asyncPostRequest(
    `${fetchEnvVar("PROJECTS_ENDPOINT")}/${projectId}`,
    {
      directDependencies: scannedDependencies,
      lastScannedAt: new Date().getTime(),
    }
  ).catch((error) => {
    return error;
  });
};

export const createNotification = async (
  notificationData: DependencyNotification
): Promise<AxiosResponse> => {
  return await asyncPutRequest(
    `${fetchEnvVar("NOTIFICATIONS_ENDPOINT")}/create`,
    notificationData,
  ).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });
};

export default { 
  asyncGetRequest, 
  asyncPostRequest, 
  asyncPutRequest, 
  getProject, 
  updateProject,
  createNotification
};
