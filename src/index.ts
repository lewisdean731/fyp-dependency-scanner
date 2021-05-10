import { buildProjectsList } from "./projects";
import { fetchEnvVar } from "./utils/env_helper";
import wrapPromiseErrors from "./wrap_promise_errors";
import scanNpmProject from "./scanners/scan_npm_project";

const BITBUCKET_USERNAME = fetchEnvVar("BITBUCKET_USERNAME");
const BITBUCKET_PASSWORD = fetchEnvVar("BITBUCKET_PASSWORD");

const scan = async (projectList:ProjectList) => {
  // Scan NPM projects
  for (const [
    ,
    { projectName, packageJsonUrl, packageLockUrl },
  ] of Object.entries(projectList.npmProjects)) {
    console.log(`Scanning project: ${projectName}`);
    await wrapPromiseErrors(
      scanNpmProject(
        packageJsonUrl,
        packageLockUrl,
        BITBUCKET_USERNAME,
        BITBUCKET_PASSWORD
      ),
      `scanNpmProject (${projectName})`
    );
    console.log(`------------------------------------------------------------`);
  }
}

(async () => {
  const projectList:ProjectList = await buildProjectsList()

  await scan(projectList);
  
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
