type NpmProject = {
  projectId: string;
  projectName: string;
  packageJsonUrl: string;
  packageLockUrl: string;
};

type ProjectList = {
  npmProjects: NpmProject[];
};
