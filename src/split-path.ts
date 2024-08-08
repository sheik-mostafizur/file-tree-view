export default (fullPath: string, matchString?: string, firstOrLast = 0) => {
  return fullPath.split(matchString || "")[firstOrLast];
};
