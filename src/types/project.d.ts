type NpmProject = {
  projectId: string;
  projectName: string;
  packageJsonUrl: string;
  packageLockUrl: string;
  yellowWarningPeriod: number;
  redWarningPeriod: number;
  authUsername: string;
  authPassword: string;
};

type ProjectList = {
  npmProjects: NpmProject[];
};
