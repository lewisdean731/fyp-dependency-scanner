type NpmProject = {
  projectId: string;
  projectName: string;
  packageJsonUrl: string;
  packageLockUrl: string;
  yellowWarningPeriod: number;
  redWarningPeriod: number;
};

type ProjectList = {
  npmProjects: NpmProject[];
};
