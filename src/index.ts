import generateFileTrees from "./generate-file-trees";
import saveTrees from "./save-trees";
import { Config, FileTreeNode } from "./types";

export const fileTreeView = async (config: Config): Promise<void> => {
  const excludedDirs = new Set(config.ignoreDir);

  const data: FileTreeNode[] = await generateFileTrees(
    config.rootPath,
    excludedDirs,
    config.projectName
  );

  if (config?.saveAs?.html) {
    saveTrees(data, config?.saveAs?.htmlPath || "").html();
  }
  if (config?.saveAs?.json) {
    saveTrees(data, config?.saveAs?.jsonPath || "").json();
  }

  if (!config?.saveAs?.html && !config?.saveAs?.json) {
    saveTrees(data, config?.saveAs?.jsonPath || "").json();
  }
};
