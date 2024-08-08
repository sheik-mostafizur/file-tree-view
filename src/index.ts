import { promises as fs } from "fs";
import * as path from "path";
import getDirectories from "./get-directories";
import getFiles from "./get-files";

const root = path.join(__dirname, "../");

const generateFilesTree = async (location: string) => {
  try {
    const dir_and_files = await fs.readdir(location);

    const directories = await getDirectories(dir_and_files);
    const files = await getFiles(dir_and_files);

    const daf = [...directories, ...files];

    const dirAndFiles = daf.map((item) => item.name);

    return dirAndFiles;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const main = async () => {
  generateFilesTree(root)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
};

main();
