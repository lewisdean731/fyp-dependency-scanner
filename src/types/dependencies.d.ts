type RawDependencies = {
  [name: string]: string;
};

type ScannedDependency = {
  name: string;
  version: string;
  release_date: Date | number;
  latest_version: string;
  latest_release_date: Date | number;
  next_version: string;
  next_release_date: Date | number;
};

type DependencyReleases = {
  [version: string]: { date: Date | number };
};
