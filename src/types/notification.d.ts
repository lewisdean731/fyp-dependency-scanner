type DependencyNotification = {
  projectId: string;
  projectName: string;
  message: string;
  severity: "info" | "yellow" | "red";
  nextVersion: string;
  dependencyName: string;
};
