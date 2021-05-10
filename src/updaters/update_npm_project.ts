import apiHelper from "../utils/api/api_helper" 

export default async (projectId: string, scannedDependencies:ScannedDependency[]) => {
  console.log(`Updating project ${projectId}`)
  await apiHelper.updateProject(projectId, scannedDependencies)
  .then(() => {
    console.log(`Project updated succesfully`)
  })
  .catch((error) => {
    console.log(`Project could not be updated: ${error}`)
  })
}