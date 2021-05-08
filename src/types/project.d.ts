type NpmProject = {
  projectName: string;
  packageJsonUrl: string;
  packageLockDotJsonUrl: string;
};

type ProjectList = {
  npmProjects: NpmProject[];
};
