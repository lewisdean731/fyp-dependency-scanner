import apiHelper from "./utils/api/api_helper";

const projectIds: string[] = ["KHQ9LkzFo1miE41bW5aL"];

export const buildProjectsList = async (): Promise<ProjectList> => {
  let npmProjectsBuilder: NpmProject[] = [];

  for (const [, projectId] of Object.entries(projectIds)) {
    console.log(`Project ID: ${projectId}`);
    const data: NpmProject | { error: string } = await apiHelper.getProject(
      projectId
    );
    if ("projectName" in data) {
      const project = {
        ...data,
        projectId: projectId,
      };
      console.log(project);
      npmProjectsBuilder.push(project);
    } else {
      console.log(`Could not add project to projectsList: ${data}`);
    }
  }
  const projects: ProjectList = {
    npmProjects: npmProjectsBuilder,
  };
  return projects;
};
