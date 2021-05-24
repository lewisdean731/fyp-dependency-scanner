import Axios from "axios";

const importFile = async (
  url: string,
  authUsername: string,
  authPassword: string
): Promise<any> => {
  console.log("importing file: " + url);
  try {
    const response = await Axios.get(url, {
      auth: {
        username: authUsername,
        password: authPassword,
      },
    });
    return response.data;
  } catch (error) {
    return new Error(`Error: ${error}`);
  }
};

function getDependencies(packageJson: PackageJson) {
  let dependencies: RawDependencies;
  dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  return dependencies;
}

function getLockDependencies(packageLockJson: PackageLockJson) {
  return packageLockJson.dependencies;
}

export { importFile, getDependencies, getLockDependencies };
