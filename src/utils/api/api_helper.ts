import axios, { AxiosResponse } from "axios";
import { fetchEnvVar } from "../../utils/env_helper";

export const asyncGetRequest = async (url:string, params?:string[]):Promise<AxiosResponse> => {
  return await axios.get(url, {params: {...params, apiKey: process.env.API_KEY}})
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}

export const getProject = async (projectId:string):Promise<NpmProject> => {

  return await asyncGetRequest(`${fetchEnvVar("PROJECTS_ENDPOINT")}/${projectId}`)
  .then((response) => {
    if(response.status === 200){
      return{
        projectName: response.data["projectName"],
        packageJsonUrl: response.data.projectType.npm.packageJsonUrl,
        packageLockUrl: response.data.projectType.npm.packageLockUrl
      }
    }
    return response.data
  }).catch((error) => {
    return error
  })
}

export default {asyncGetRequest, getProject}