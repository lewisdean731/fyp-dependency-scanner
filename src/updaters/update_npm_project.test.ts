import updateNpmProject from "./update_npm_project";

import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const scannedDependencies: ScannedDependency[] = [
  {
    name: "dependency1",
    version: "1.2.3",
    latest_version: "1.2.3",
    next_version: "1.2.3",
    release_date: new Date("2021-04-27T20:58:03.835Z"),
    latest_release_date: new Date("2021-05-10T22:58:18.150Z"),
    next_release_date: new Date("2021-05-10T22:58:18.150Z"),
  },
];

describe("updateNpmProject", () => {
  test("returns success when update is successful", async () => {
    const response = {
      response: {
        status: 200,
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    const resp = await updateNpmProject("projectId", scannedDependencies);
    expect(resp).toEqual(response);
  });

  test("returns error when update is not successful", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.reject("Error: something went wrong")
    );

    await updateNpmProject("projectId", scannedDependencies).catch((error) =>
      expect(error).toEqual("Error: somethin went wrong")
    );
  });
});
