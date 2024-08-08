import * as path from "path";
import generateFileTrees from "./generate-file-trees";
import saveTrees from "./save-trees";
import FileTreeNode from "./types/file-tree-node";

// If do not set "../" it's work for src
const root = path.join(__dirname, "../");

const main = async () => {
  const excludedDirs = new Set([
    `${root}node_modules`,
    `${root}.git`,
    `${root}treeify-html`,
  ]);

  const data: FileTreeNode[] = await generateFileTrees(
    root,
    excludedDirs,
    "treeify"
  );

  saveTrees(data).html();
};

main();
