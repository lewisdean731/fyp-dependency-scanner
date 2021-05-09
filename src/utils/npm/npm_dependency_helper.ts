import Axios from "axios";

// Returns all depenency metadata
export const getDependencyMetadata = async (name: string): Promise<any> => {
  const url = `https://registry.npmjs.org/${name}`;
  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// Returns all versions of a dependency and release date
export const getDependencyReleases = async (
  name: string
): Promise<DependencyReleases> => {
  const md: any = await getDependencyMetadata(name);
  return md.time;
};

// Returns latest dependency version and release date
export const getLatestDependencyRelease = async (
  name: string
): Promise<string> => {
  const md: any = await getDependencyMetadata(name);
  return md["dist-tags"]["latest"];
};

// Find a dependency in the package-lock.json
export const findDependency = (lockfile: PackageLockJson, name: string) => {
  if (lockfile.dependencies[name] !== undefined) {
    return lockfile.dependencies[name];
  }
  return { version: "null" };
};
