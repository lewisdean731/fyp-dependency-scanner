import { createNotification } from "./api/api_helper";

// Compares current installed version to latest available
export function isUsingLatestVersion(dependency: ScannedDependency): boolean {
  let currentVersionArray = toVersionIntArray(dependency.version);
  let latestVersionArray = toVersionIntArray(dependency.latest_version);

  for (let i = 0; i < currentVersionArray.length; i++) {
    if (currentVersionArray[i] !== latestVersionArray[i]) {
      return false;
    }
  }
  return true;
}

// Check collated dependencies
export const checkDependencies = (dependencies: ScannedDependency[]) => {
  dependencies.forEach((d) => {
    const bool = isUsingLatestVersion(d);
    if (bool === true) {
      console.log(
        `[IN_DATE] ${d.name} is running the latest version: ${d.version}`
      );
    } else {
      const dateDiff = howOutOfDate(d.next_release_date);
      console.log(
        `[OUT_OF_DATE] ${d.name} is running version ${
          d.version
        }. The next version is ${
          d.next_version
        } and it has been available for ${Math.round(
          dateDiff / 8.64e7
        )} Days. The latest version is ${d.latest_version}.`
      );
    }
  });
};

// Create notifications for dependencies that are > yellow/red thresholds
export const createNotifications = async (
  projectId: string,
  projectName: string,
  dependencies: ScannedDependency[],
  yellowWarningPeriod: number,
  redWarningPeriod: number
): Promise<any> => {
  const red_days = redWarningPeriod / 8.64e7;
  const yellow_days = yellowWarningPeriod / 8.64e7;
  dependencies.forEach(async (d) => {
    if (isUsingLatestVersion(d)) {
      return;
    }
    const dateDiff = howOutOfDate(d.next_release_date);

    switch (true) {
      case dateDiff > redWarningPeriod:
        await createNotification({
          projectId: projectId,
          projectName: projectName,
          message: `'${d.name}' is more than ${red_days} days out of date`,
          severity: "red",
          nextVersion: d.next_version,
          dependencyName: d.name.replace(/[/]/, ""), // regexr.com/5tcjs
        });
        break;
      case dateDiff > yellowWarningPeriod:
        await createNotification({
          projectId: projectId,
          projectName: projectName,
          message: `'${d.name}' is more than ${yellow_days} days out of date`,
          severity: "yellow",
          nextVersion: d.next_version,
          dependencyName: d.name.replace(/[/]/, ""),
        });
    }
  });
};

// Return how long a version has been available for
export function howOutOfDate(releaseDate: Date | number): number {
  // https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function
  let currentDate = new Date().getTime();
  return currentDate - new Date(releaseDate).getTime();
}

// Gets the next version of a dependency from the list of versions.
// Uses a regex to weed out beta and development versions e.g. 1.2.0-beta1
export const getNextDependencyVersion = (
  releases: DependencyReleases,
  dependency: ScannedDependency
): string => {
  if (isUsingLatestVersion(dependency)) {
    return dependency.latest_version;
  }
  const releaseArray = [];
  const regex = /[.\-\D]+\D/; //regexr.com/57ddh

  for (const v in releases) {
    if (!v.match(regex)) {
      releaseArray.push(v);
    }
  }

  const nextVersion =
    releaseArray[releaseArray.indexOf(dependency.version) + 1];

  if (nextVersion !== undefined) {
    return nextVersion;
  }
  return "null"; // Unix epoch
};

// Returns dependency release date
export const getDependencyReleaseDate = (
  version: string,
  releases: any
): Date => {
  if (releases[version] === undefined) {
    releases[version] = { date: new Date(0) };
  }
  return releases[version];
};

// Splits version into an array e.g. '2.1.0' => ['2','1','0']
// https://stackoverflow.com/questions/9914216/how-do-i-separate-an-integer-into-separate-digits-in-an-array-in-javascript
const toVersionIntArray = (version: string): number[] => {
  return version
    .toString()
    .split(".")
    .map(function (t) {
      return parseInt(t);
    });
};
