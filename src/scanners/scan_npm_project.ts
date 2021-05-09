// analyse a specified project
import wrapPromiseErrors from "../wrap_promise_errors";
import * as npmPackageHelper from "../utils/npm/npm_package_helper";
import * as npmDependencyHelper from "../utils/npm/npm_dependency_helper";
import * as dependencyHelper from "../utils/dependency_helper";

// Get current and latest version of dependencies we specify explicitly
const collateDependencies = async (
  dependencies: RawDependencies,
  packageLockJson: PackageLockJson
): Promise<ScannedDependency[]> => {
  let exactDependencyVersions = [];
  console.log(`Getting dependencies for project`);

  for (const d in dependencies) {
    let ed = {} as ScannedDependency;

    const releases: DependencyReleases | undefined = await wrapPromiseErrors(
      npmDependencyHelper.getDependencyReleases(d),
      "getDependencyreleases"
    );

    if (releases === undefined) {
      console.log(`[ERROR] Dependency ${d} not found on registry.npmjs.org!`);
    } else {
      ed.name = d;
      (ed.version = npmDependencyHelper.findDependency(
        packageLockJson,
        d
      ).version),
        (ed.latest_version = await wrapPromiseErrors(
          npmDependencyHelper.getLatestDependencyRelease(d),
          "getLatestDependencyRelease"
        ));
      ed.next_version = dependencyHelper.getNextDependencyVersion(releases, ed);
      ed.release_date = dependencyHelper.getDependencyReleaseDate(
        ed.version,
        releases
      );
      ed.latest_release_date = dependencyHelper.getDependencyReleaseDate(
        ed.latest_version,
        releases
      );
      ed.next_release_date = dependencyHelper.getDependencyReleaseDate(
        ed.next_version,
        releases
      );

      exactDependencyVersions.push(ed);
      console.log(ed);
    }
  }

  return exactDependencyVersions;
};

export default async (
  url: string,
  urlPackageLock: string,
  BITBUCKET_USERNAME: string,
  BITBUCKET_PASSWORD: string
) => {
  // Get needed files from repository
  const packageDotJson:PackageJson = await npmPackageHelper.importFile(
    url,
    BITBUCKET_USERNAME,
    BITBUCKET_PASSWORD
  );

  const packageLockDotJson:PackageLockJson = await npmPackageHelper.importFile(
    urlPackageLock,
    BITBUCKET_USERNAME,
    BITBUCKET_PASSWORD
  );
  
  let dependencies:RawDependencies = npmPackageHelper.getDependencies(packageDotJson);

  let collatedDependencies = await collateDependencies(
    dependencies,
    packageLockDotJson
  );

  dependencyHelper.checkDependencies(collatedDependencies);

};
