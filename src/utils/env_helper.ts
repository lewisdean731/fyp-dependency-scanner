export const fetchEnvVar = (envVar: string) => {
  const result = process.env[envVar];
  if (result === undefined) {
    throw new Error(`Environment variable not found! (${envVar})`);
  }

  return result;
};

export const EnvVarSet = (envVar: string) => {
  return envVar in process.env;
};
