type NpmProject = {
  projectName: string;
  packageJsonUrl: string;
  packageLockUrl: string;
};

type ProjectList = {
  npmProjects: NpmProject[];
};
