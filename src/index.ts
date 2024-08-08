import { promises as fs } from "fs";
import * as path from "path";

const root = path.join(__dirname, "../");

interface FileTreeNode {
  name: string;
  path: string;
  type: "directory" | "file";
  children?: FileTreeNode[]; // Optional field for nested directories
}

const generateFilesTree = async (
  location: string,
  skipDir: Set<string> = new Set()
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
          path: filePath,
          type: "directory",
          children: await generateFilesTree(filePath, excludedDirs), // Recursively get children
        };
      }

      // If it's a file, just return the file object
      if (stat.isFile()) {
        return {
          name: file,
          path: filePath,
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

const main = async () => {
  const excludedDirs = new Set([`${root}node_modules`, `${root}.git`]);
  console.log(excludedDirs);
  const data = await generateFilesTree(root, excludedDirs);

  await fs.writeFile("file-trees.json", JSON.stringify(data, null, 2));
};

main();
