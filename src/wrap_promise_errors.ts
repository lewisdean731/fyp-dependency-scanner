export default <T>(promise: Promise<T>, functionName: string): Promise<T> =>
  promise.catch(err => {
    throw new Error(`Error in ${functionName}\n${err}`);
  });
