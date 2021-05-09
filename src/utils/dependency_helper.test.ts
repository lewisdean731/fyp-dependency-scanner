import * as dependencyHelper from "./dependency_helper";

console.log = jest.fn();

const scannedDependencies:ScannedDependency[] = [
  {
    name: 'dependency1',
    version: '1.2.3',
    latest_version: '1.3.5',
    next_version: '1.3.0',
    release_date: new Date('2021-04-20T20:58:03.835Z'),
    latest_release_date: new Date('2021-04-30T20:58:03.835Z'),
    next_release_date: new Date('2021-04-25T20:58:03.835Z')
  },
  {
    name: 'dependency2',
    version: '1.2.3',
    latest_version: '1.2.3',
    next_version: '1.2.3',
    release_date: new Date('2021-04-05T20:58:03.835Z'),
    latest_release_date: new Date('2021-04-05T20:58:03.835Z'),
    next_release_date: new Date('2021-04-05T20:58:03.835Z')
  },
  {
    name: 'dependency3',
    version: '2.3.4',
    latest_version: '2.3.4',
    next_version: '2.3.4',
    release_date: new Date('2021-04-05T20:58:03.835Z'),
    latest_release_date: new Date('2021-04-05T20:58:03.835Z'),
    next_release_date: new Date('2021-04-05T20:58:03.835Z')
  }
]

const expConsoleLog1 = 
"Results for project 'projName'"
"[IN_DATE] dependency2 is running the latest version: 1.2.3"
"[IN_DATE] dependency3 is running the latest version: 2.3.4";

const expConsoleLog2 = 
"Results for project 'projName'"
"[IN_DATE] dependency2 is running the latest version: 1.2.3"
"[IN_DATE] dependency3 is running the latest version: 1.2.3";

const dependencyReleases:DependencyReleases = {
  "1.3.0":{ date: new Date('2021-04-05T20:58:03.835Z')},
  "1.3.1-beta1":{ date: new Date('2021-04-05T20:58:03.835Z')},
  "1.3.1":{ date: new Date('2021-04-05T20:58:03.835Z')},
  "1.3.2":{ date: new Date('2021-04-05T20:58:03.835Z')},
  "1.4.0":{ date: new Date('2021-04-05T20:58:03.835Z')},
}


describe("isUsingLatestVersion", () => {
  test("should return true when a dependency is the latest version", () => {   
    expect(dependencyHelper
      .isUsingLatestVersion(scannedDependencies[1])).toEqual(true);
  });

  test("should return false when a dependency is out of date", () => {   
      expect(dependencyHelper
        .isUsingLatestVersion(scannedDependencies[0])).toEqual(false);
  });
});

describe("checkDependencies", () => {
  test("should return all dependencies as IN_DATE when in date", () => {
    const sd:ScannedDependency[] = [
      scannedDependencies[1], 
      scannedDependencies[2]   
    ]
    dependencyHelper.checkDependencies("projName", sd);
    expect(console.log).toHaveBeenCalledWith(expConsoleLog1);
  });

  test("should return OUT_OF_DATE for dependencies not up to date", () => {
    const sd:ScannedDependency[] = [
      scannedDependencies[0], 
      scannedDependencies[1]   
    ]
    dependencyHelper.checkDependencies("projName", sd);
    expect(console.log).toHaveBeenCalledWith(expConsoleLog2);
  });
});

describe("getNextDependencyVersion", () => {
  test("should return next dependency version", () => {
    expect(dependencyHelper.getNextDependencyVersion(dependencyReleases, scannedDependencies[0])).toEqual("1.3.0");
  });

  test("should return the latest dependency version if it is so", () => {
    expect(dependencyHelper.getNextDependencyVersion(dependencyReleases, scannedDependencies[2])).toEqual("2.3.4");
  });
});

describe("getDependencyReleaseDate", () => {
  test("should return release date for version", () => {
    expect(dependencyHelper.getDependencyReleaseDate("1.3.0", dependencyReleases)).toEqual({date: new Date('2021-04-05T20:58:03.835Z')});
  });

  test("should return epoch date if not found", () => {
    expect(dependencyHelper.getDependencyReleaseDate("9.9.9", dependencyReleases)).toEqual({date: new Date(0)});
  })
})