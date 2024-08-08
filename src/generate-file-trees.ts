import { promises as fs } from "fs";
import * as path from "path";

import splitPath from "./split-path";
import { FileTreeNode } from "./types";

const generateFileTrees = async (
  location: string,
  skipDir: Set<string> = new Set(),
  projectName?: string
): Promise<FileTreeNode[]> => {
  const excludedDirs = new Set(skipDir);

  // Read the contents of the directory
  const dirAndFiles = await fs.readdir(location);

  // Process each file and directory
  const result = await Promise.all(
    dirAndFiles.map(async (file) => {
      const filePath = path.join(location, file);
      const stat = await fs.stat(filePath);

      // Skip directories that are in the excluded list
      if (stat.isDirectory()) {
        if (excludedDirs.has(filePath)) {
          // Skip this directory
          return null;
        }
        return {
          name: file,
          path: splitPath(filePath, projectName, 1),
          type: "directory",
          children: await generateFileTrees(
            filePath,
            excludedDirs,
            projectName
          ), // Recursively get children
        };
      }

      // If it's a file, just return the file object
      if (stat.isFile()) {
        return {
          name: file,
          path: splitPath(filePath, projectName, 1),
          type: "file",
        };
      }

      // Return null if it's neither a file nor a directory
      return null;
    })
  );

  // Filter out null values if any
  return result.filter((item) => item !== null) as FileTreeNode[];
};

export default generateFileTrees;
