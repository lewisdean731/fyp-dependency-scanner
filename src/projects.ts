import apiHelper from "./utils/api/api_helper";
import pullMessages from "./utils/pubsub/pubsub_helper";

const predefinedProjectIds: string[] = [
  "msjiD8S1WmT3McMDmyis",
  "RFQOZOWqwSRo5ZBHNiKC",
  "9HluxswtxkRy0KXL3F4R",
  "E8c6u3D4RwvWxrXxh8HX",
  "KHQ9LkzFo1miE41bW5aL",
  "SF3DBO8Y9gsMCTycUYiq",
  "Sws5VU2pTDc1kvMDjGOS",
  "iPvX2rynoqcxuxHfd2z4",
];

export const buildProjectsList = async (): Promise<ProjectList> => {
  let npmProjectsBuilder: NpmProject[] = [];

  let projectIds: string[] = process.env.USE_PREDEFINED_PROJECTLIST
    ? predefinedProjectIds
    : await pullMessages();

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
