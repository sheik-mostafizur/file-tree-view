import { promises as fs } from "fs";
import { Stats } from "fs";

// Define an interface for file information
interface FileInfo {
  name: string;
  stat: Stats;
}

export default async (dir_and_files: string[]): Promise<FileInfo[]> => {
  // Process each file to get its stats and return as objects
  const directoriesWithName = await Promise.all(
    dir_and_files.map(async (file: string) => {
      try {
        const stat = await fs.stat(file);
        // Include the file name and stat in the result
        const result: FileInfo = { name: file, stat };
        // Return only if it's a directory
        if (stat.isDirectory()) {
          return result;
        }
      } catch (error) {
        console.error(`Error getting stats for file ${file}:`, error);
        return undefined;
      }
    })
  );

  // Filter out undefined results (in case of errors or non-directory files)
  const filteredDir = directoriesWithName.filter(
    (file): file is FileInfo => file !== undefined
  );

  // Sort the directories by name
  const sortDir = filteredDir.sort((a, b) => a.name.localeCompare(b.name));

  return sortDir;
};
