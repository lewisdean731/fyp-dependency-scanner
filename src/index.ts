import { projects } from "./projects";
import { fetchEnvVar } from "./utils/env_helper";
import wrapPromiseErrors from "./wrap_promise_errors";


const BITBUCKET_USERNAME = fetchEnvVar("BITBUCKET_USERNAME");
const BITBUCKET_PASSWORD = fetchEnvVar("BITBUCKET_PASSWORD");

(async () => {
  // Analyse NPM projects
  for (const [
    ,
    { projectName, packageJsonUrl, packageLockDotJsonUrl }
  ] of Object.entries(projects.npmProjects)) {
    console.log(`Analysing project: ${projectName}`);
    await wrapPromiseErrors(
      analyseNpmProject(
        projectName,
        packageJsonUrl,
        packageLockDotJsonUrl,
        BITBUCKET_USERNAME,
        BITBUCKET_PASSWORD
      ),
      `analyseNpmProject (${projectName})`
    );
    console.log(`------------------------------------------------------------`);
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});

async function analyseNpmProject(
  projectName: string,
  url: string,
  urlPackageLock: string,
  BITBUCKET_USERNAME: string,
  BITBUCKET_PASSWORD: string){
    console.log("Hello World")
}