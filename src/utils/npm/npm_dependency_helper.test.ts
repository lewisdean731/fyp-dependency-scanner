import * as npmDependencyHelper from "../../utils/npm/npm_dependency_helper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const depMetaData = {
  data: {
    name: "fakeDependency",
    stuff: "abcd",
    otherStuff: 999,
    versions: {
      "1.0.0": {
        name: "fakeDependency"
      },
      "1.1.0": {
        version: "FakeDependency"
      }
    },
    time: {
      "modified": "2021-05-01T06:08:49.451Z",
      "created": "2012-02-01T04:32:55.209Z",
      "1.0.0": "2012-02-01T04:32:57.016Z",
      "1.1.0": "2012-02-03T18:04:34.851Z",
    }
  }
}

describe("getDependencyMetadata", () => {
  test("should return dependency metadata", () => {
    mockedAxios.get.mockResolvedValue(depMetaData);
  
    return npmDependencyHelper
      .getDependencyMetadata("fakeDependency")
      .then(data => expect(data).toEqual(depMetaData.data));
  });

  test("returns an error when the response is bad", () => {
    const errorMessage = 'Error: Fake Error';

    mockedAxios.get.mockRejectedValueOnce(new Error('Fake Error'));

    return npmDependencyHelper
      .getDependencyMetadata("fakeDependency")
      .catch(error => expect(error).toEqual(errorMessage));
  });

  test("calls the correct URL", () => {
    npmDependencyHelper.getDependencyMetadata("fakeDependency")

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://registry.npmjs.org/fakeDependency`
    );
  })
});
