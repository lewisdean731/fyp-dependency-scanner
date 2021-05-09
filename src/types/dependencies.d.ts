type RawDependencies = {
  [name: string]: string;
};

type ScannedDependency = {
  name: string;
  version: string;
  release_date: Date;
  latest_version: string;
  latest_release_date: Date;
  next_version: string;
  next_release_date: Date;
};

type DependencyReleases = {
  [version: string]: { date: Date };
};
