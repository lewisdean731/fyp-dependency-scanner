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
      if (error.status === 400) {
        return error;
      } else {
        throw new Error(error);
      }
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

export default { asyncGetRequest, getProject };
