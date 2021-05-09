import { projects } from "./projects";
import { fetchEnvVar } from "./utils/env_helper";
import wrapPromiseErrors from "./wrap_promise_errors";
import scanNpmProject from "./scanners/scan_npm_project"
const BITBUCKET_USERNAME = fetchEnvVar("BITBUCKET_USERNAME");
const BITBUCKET_PASSWORD = fetchEnvVar("BITBUCKET_PASSWORD");

(async () => {
  // Analyse NPM projects
  for (const [
    ,
    { projectName, packageJsonUrl, packageLockDotJsonUrl },
  ] of Object.entries(projects.npmProjects)) {
    console.log(`Scanning project: ${projectName}`);
    await wrapPromiseErrors(
      scanNpmProject(
        projectName,
        packageJsonUrl,
        packageLockDotJsonUrl,
        BITBUCKET_USERNAME,
        BITBUCKET_PASSWORD
      ),
      `scanNpmProject (${projectName})`
    );
    console.log(`------------------------------------------------------------`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
