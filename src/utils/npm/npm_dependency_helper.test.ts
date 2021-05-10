import * as npmDependencyHelper from "./npm_dependency_helper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const depMetaData = {
  data: {
    name: "fakeDependency",
    "dist-tags": {
      latest: "1.1.0",
    },
    versions: {
      "1.0.0": {
        name: "fakeDependency",
      },
      "1.1.0": {
        version: "FakeDependency",
      },
    },
    time: {
      modified: "2021-05-01T06:08:49.451Z",
      created: "2012-02-01T04:32:55.209Z",
      "1.0.0": "2012-02-01T04:32:57.016Z",
      "1.1.0": "2012-02-03T18:04:34.851Z",
    },
  },
};

const packageLock = {
  name: "package-lock",
  version: "1.0.0",
  lockfileVersion: 1,
  requires: true,
  dependencies: {
    dependency1: {
      version: "0.1.2",
    },
    dependency2: {
      version: "2.3.4",
    },
  },
};

describe("getDependencyMetadata", () => {
  test("should return dependency metadata", () => {
    mockedAxios.get.mockResolvedValue(depMetaData);

    return npmDependencyHelper
      .getDependencyMetadata("fakeDependency")
      .then((data) => expect(data).toEqual(depMetaData.data));
  });

  test("returns an error when the response is bad", () => {
    const errorMessage = "Error: Fake Error";

    mockedAxios.get.mockRejectedValueOnce(new Error("Fake Error"));

    return npmDependencyHelper
      .getDependencyMetadata("fakeDependency")
      .catch((error) => expect(error).toEqual(errorMessage));
  });

  test("calls the correct URL", () => {
    npmDependencyHelper.getDependencyMetadata("fakeDependency");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://registry.npmjs.org/fakeDependency`
    );
  });
});

describe("getDependencyReleases", () => {
  test("should return releases from dependency metadata", () => {
    mockedAxios.get.mockResolvedValue(depMetaData);

    return npmDependencyHelper
      .getDependencyReleases("fakeDependency")
      .then((data) => expect(data).toEqual(depMetaData.data.time));
  });
});

describe("getLatestDependencyRelease", () => {
  test("should return latest dependency release", () => {
    mockedAxios.get.mockResolvedValue(depMetaData);

    return npmDependencyHelper
      .getLatestDependencyRelease("fakeDependency")
      .then((data) => expect(data).toEqual("1.1.0"));
  });
});

describe("findDependency", () => {
  test("should find dependency version in package-lock.json", () => {
    const version = npmDependencyHelper.findDependency(
      packageLock,
      "dependency1"
    );

    expect(version).toEqual({ version: "0.1.2" });
  });

  test("returns null when dependency is not found", () => {
    const version = npmDependencyHelper.findDependency(
      packageLock,
      "nonExistentDependency"
    );

    expect(version).toEqual({ version: "null" });
  });
});
