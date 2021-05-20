import { buildProjectsList } from "./projects";
import { fetchEnvVar } from "./utils/env_helper";
import wrapPromiseErrors from "./wrap_promise_errors";
import scanNpmProject from "./scanners/scan_npm_project";
import apiHelper from "./utils/api/api_helper";
import { createNotifications } from "./utils/dependency_helper";

const BITBUCKET_USERNAME: string = fetchEnvVar("BITBUCKET_USERNAME");
const BITBUCKET_PASSWORD: string = fetchEnvVar("BITBUCKET_PASSWORD");
const RUN_DELAY_SECONDS: number = parseInt(fetchEnvVar("RUN_DELAY_SECONDS"));

const delay = (s: number) => {
  const ms = s * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const scanAndUpdate = async (projectList: ProjectList) => {
  // Scan NPM projects
  for (const [
    ,
    { 
      projectId, 
      projectName, 
      packageJsonUrl, 
      packageLockUrl, 
      yellowWarningPeriod, 
      redWarningPeriod },
  ] of Object.entries(projectList.npmProjects)) {
    console.log(`Scanning project: ${projectName}`);
    const scannedDependencies: ScannedDependency[] = await wrapPromiseErrors(
      scanNpmProject(
        packageJsonUrl,
        packageLockUrl,
        BITBUCKET_USERNAME,
        BITBUCKET_PASSWORD
      ),
      `scanNpmProject (${projectName})`
    );
    await createNotifications(
      projectId,
      projectName,
      scannedDependencies,
      yellowWarningPeriod,
      redWarningPeriod
    )

    await apiHelper
      .updateProject(projectId, scannedDependencies)
      .then(() => {
        console.log(`Project updated succesfully`);
      })
      .catch((e) => {
        console.log(`Project could not be updated: ${e}`);
      });
    console.log(`------------------------------------------------------------`);
  }
};

(async () => {
  while (true) {
    const projectList: ProjectList = await buildProjectsList();

    await scanAndUpdate(projectList);

    await delay(RUN_DELAY_SECONDS);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
