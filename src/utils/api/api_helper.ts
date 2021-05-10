import axios, { AxiosResponse } from "axios";
import { fetchEnvVar } from "../../utils/env_helper";

export const asyncGetRequest = async (url:string, params?:string[]):Promise<AxiosResponse> => {
  return await axios.get(url, {params: {...params, apiKey: process.env.API_KEY}})
  .then((response) => {
    return response
  })
  .catch((error) => {
    throw new Error (error)
  })
}

export const getProject = async (projectId:string):Promise<{error: string} | NpmProject> => {

  return await asyncGetRequest(`${fetchEnvVar("PROJECTS_ENDPOINT")}/${projectId}`)
  .then((response) => {
    if(response.status === 200){
      return{
        projectName: response.data["projectName"],
        packageJsonUrl: response.data.projectType.npm.packageJsonUrl,
        packageLockUrl: response.data.projectType.npm.packageLockUrl
      }
    }
    return {error: "No such document"}
  }).catch((error) => {
      return error
  })
}

export default {asyncGetRequest, getProject}