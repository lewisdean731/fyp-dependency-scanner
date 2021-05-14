import apiHelper from "./utils/api/api_helper";
import pullMessages from "./utils/pubsub/pubsub_helper";


export const buildProjectsList = async (): Promise<ProjectList> => {
  let npmProjectsBuilder: NpmProject[] = [];

  let projectIds:string[] = await pullMessages();

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
