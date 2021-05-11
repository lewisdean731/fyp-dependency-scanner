import apiHelper from "../utils/api/api_helper";

export default async (
  projectId: string,
  scannedDependencies: ScannedDependency[]
) => {
  console.log(`Updating project ${projectId}`);
  await apiHelper
    .updateProject(projectId, scannedDependencies)
    .then((response) => {
      console.log(`Project updated succesfully`);
      return response;
    })
    .catch((error) => {
      console.log(`Project could not be updated: ${error}`);
      return error;
    });
};
