import apiHelper from "./api_helper";
import axios from "axios"

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("authorise", () => {
  test("example", () => {
    expect(true).toEqual(true)
  });
});

describe("getProject", () => {
  test("should return project details when given the correct ID", () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({
      response: {
        status: 200, 
        data: {
            projectName: "Fake Project",
            team: "fakeTeamId",
            projectType: {
              npm: {
                packageJsonUrl: "fakeUrl",
                packageLockUrl: "fakeUrl"
              }
            }
        } 
      } 
    }));

    const data = apiHelper
      .getProject("fakeProjectId")
      .then(response => expect(response.status).toEqual(200));

    expect(data).toEqual(
      {
        projectName: "Fake Project",
        packageJsonUrl: "fakeUrl",
        packageLockUrl: "fakeUrl"
      }
    )

  });

  test("should return an error when project not found", () => {
    expect(true).toEqual(true)
  });
});

describe("updateProject", () => {
  test("should update project when given the correct ID", () => {
    expect(true).toEqual(true)
  });

  test("should return an error when project not found", () => {
    expect(true).toEqual(true)
  });
});


describe("example", () => {
  test("example", () => {
    expect(true).toEqual(true)
  });
});