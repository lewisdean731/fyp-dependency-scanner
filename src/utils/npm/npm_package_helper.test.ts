import * as npmPackageHelper from "../../utils/npm/npm_package_helper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("importFile", () => {
  test("should fetch package.json", () => {
    const response = {
      data: {
        name: "package",
        devDependencies: {
          dependency1: "^0.1.2"
        },
        dependencies: {
          dependency2: "^2.3.4"
        }
      }
    };
  
    mockedAxios.get.mockResolvedValue(response);
  
    return npmPackageHelper
      .importFile("fakeUrl", "username", "password")
      .then(data => expect(data).toEqual(response.data));
  });
  
  test("should fetch package-lock.json", () => {
    const response = {
      data: {
        name: "package-lock",
        version: "1.0.0",
        lockfileVersion: 1,
        requires: true,
        dependencies: {
          dependency1: {
            version: "0.1.2"
          },
          dependency2: {
            version: "2.3.4"
          }
        }
      }
    };
  
    mockedAxios.get.mockResolvedValue(response);

    return npmPackageHelper
      .importFile("fakeUrl", "username", "password")
      .then(data => expect(data).toEqual(response.data));
  });

  test("throws an error when the response is bad", () => {
    const errorMessage = 'Fake Error';
 
    mockedAxios.get.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage)),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "fakeUrl", {"auth": {"password": "password", "username": "username"}}
    );

    return npmPackageHelper
      .importFile("fakeUrl", "username", "password")
      .catch(error => expect(error).toEqual(errorMessage));
  });
});

describe("getDependencies", () => {
  test("should extract dependencies from file", () => {

  });

});


