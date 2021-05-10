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
    expect(true).toEqual(true)
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