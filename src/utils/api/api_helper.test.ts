import apiHelper from "./api_helper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

process.env.PROJECTS_ENDPOINT = "/api/fake/project";
process.env.API_KEY = "apikey123";

//is actually ScannedDependency[] but vscode errors
const scannedDependencies: any[] = [ 
  {
    name: "dependency1",
    version: "1.2.3",
    latest_version: "1.2.3",
    next_version: "1.2.3",
    release_date: new Date("2021-04-27T20:58:03.835Z"),
    latest_release_date: new Date("2021-05-10T22:58:18.150Z"),
    next_release_date: new Date("2021-05-10T22:58:18.150Z"),
  }
];

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

  test("returns an error if the request returns a 404", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      status: 404,
      data: {},
    });

    await apiHelper.asyncGetRequest("fakeUrl").catch((error) =>
      expect(error).toEqual({
        status: 404,
        data: {},
      })
    );
  });

  test("throws an error if the request goes wrong and not a 404", async () => {
    mockedAxios.get.mockRejectedValueOnce("something went wrong");

    await apiHelper
      .getProject("fakeProjectId")
      .catch((error) => expect(error).toEqual("Error: something went wrong"));
  });
});

describe("asyncPostRequest", () => {
  test("returns a 200 when authorised", async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 200
      })
    );

    await apiHelper
      .asyncPostRequest("fakeUrl", {})
      .then((response) => expect(response.status).toEqual(200));
  });

  test("returns a 401 error when unauthorised", async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.reject("401 unauthorised")
    );

    await apiHelper
    .asyncPostRequest("fakeUrl", {})
      .catch((error) => expect(error).toEqual(new Error("401 unauthorised")));
  });

  test("returns an error if the request returns a 404", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      status: 404,
      data: {},
    });

    await apiHelper.getProject("fakeProjectId").catch((error) =>
      expect(error).toEqual({
        status: 404,
        data: {},
      })
    );
  });

  test("throws an error if the request goes wrong and not a 404", async () => {
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
    mockedAxios.get.mockImplementation(() => Promise.reject("errMessage"));

    await apiHelper
      .getProject("fakeProjectId")
      .then((data) => expect(data).toEqual(new Error("errMessage")));
  });

  test("throws an error if the request goes wrong", async () => {
    mockedAxios.get.mockRejectedValueOnce("something went wrong");

    await apiHelper
      .getProject("fakeProjectId")
      .catch((error) => expect(error).toEqual("Error: something went wrong"));
  });
});

describe("updateProject", () => {
  test("should update a project when given the correct ID", async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 200
      })
    );

    await apiHelper
      .updateProject("projectId", scannedDependencies)
      .then((response) => expect(response.status).toEqual(200));
  });

  test("should return an error when project not found", async () => {
    mockedAxios.post.mockImplementation(() =>
      Promise.reject(new Error("project not found"))
    );
    await apiHelper
    .updateProject("projectId", scannedDependencies)
      .catch((error) => expect(error).toEqual({
        status: 404,
        data:{error: "project not found"}
      }));
  });
});

describe("example", () => {
  test("example", () => {
    expect(true).toEqual(true);
  });
});
