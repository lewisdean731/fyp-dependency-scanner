import Axios from "axios";

// Not sure why this implementation doesn't return the data in time yet the
// Below implementation does
/* const importFile = async (
  url: string,
  BITBUCKET_USERNAME: string,
  BITBUCKET_PASSWORD: string
): Promise<any> => {
  console.log("importing file: " + url);
  await Axios.get(url, {
    auth: {
      username: BITBUCKET_USERNAME,
      password: BITBUCKET_PASSWORD,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Error: ${error}`);
    });
}; */

const importFile = async (
  url: string,
  BITBUCKET_USERNAME: string,
  BITBUCKET_PASSWORD: string
): Promise<any> => {
  console.log("importing file: " + url);
  try {
    const response = await Axios.get(url, {
      auth: {
        username: BITBUCKET_USERNAME,
        password: BITBUCKET_PASSWORD,
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
