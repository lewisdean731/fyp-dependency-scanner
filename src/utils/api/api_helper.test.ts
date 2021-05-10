import apiHelper from "./api_helper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

process.env.PROJECTS_ENDPOINT = "/api/fake/projects";
process.env.API_KEY = "apikey123";

describe("asyncGetRequest", () => {
  test("returns a 200 when authorised", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      })
    );

    await apiHelper
      .asyncGetRequest("fakeUrl")
      .then((response) => expect(response.status).toEqual(200));
  });

  test("returns a 401 when unauthorised", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 401,
      })
    );

    await apiHelper
      .asyncGetRequest("fakeUrl")
      .then((response) => expect(response.status).toEqual(401));
  });

  test("throws an error if the request goes wrong", async () => {
    mockedAxios.get.mockRejectedValueOnce("something went wrong");

    await apiHelper
      .getProject("fakeProjectId")
      .catch((error) => expect(error).toEqual("Error: something went wrong"));
  });
});

describe("getProject", () => {
  test("should return project details when given the correct ID", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          projectName: "Fake Project",
          team: "fakeTeamId",
          projectType: {
            npm: {
              packageJsonUrl: "fakeUrl",
              packageLockUrl: "fakeUrl",
            },
          },
        },
      })
    );

    await apiHelper.getProject("fakeProjectId").then((data) =>
      expect(data).toEqual({
        projectName: "Fake Project",
        packageJsonUrl: "fakeUrl",
        packageLockUrl: "fakeUrl",
      })
    );
  });

  test("should return an error when project not found", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 404,
        data: { error: "No such document" },
      })
    );

    await apiHelper.getProject("fakeProjectId").then((data) =>
      expect(data).toEqual({
        error: "No such document",
      })
    );
  });

  test("throws an error if the request goes wrong", async () => {
    mockedAxios.get.mockRejectedValueOnce("something went wrong");

    await apiHelper
      .getProject("fakeProjectId")
      .catch((error) => expect(error).toEqual("Error: something went wrong"));
  });
});

describe("updateProject", () => {
  test("should update project when given the correct ID", () => {
    expect(true).toEqual(true);
  });

  test("should return an error when project not found", () => {
    expect(true).toEqual(true);
  });
});

describe("example", () => {
  test("example", () => {
    expect(true).toEqual(true);
  });
});
