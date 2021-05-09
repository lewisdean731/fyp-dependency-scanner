type PackageJson = {
  name: string;
  devDependencies: any;
  dependencies: any;
};

type PackageLockJson = {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  dependencies: {
    [dependencyName: string]: { version: string };
  };
};
