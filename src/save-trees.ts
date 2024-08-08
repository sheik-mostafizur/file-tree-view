import { promises as fs } from "fs";
import FileTreeNode from "./types/file-tree-node";

export default async (data: FileTreeNode[], path = "") => {
  let savePath = path;

  if (!path.endsWith("/") && path) {
    savePath = savePath + "/";
  }

  await fs.writeFile(
    savePath + "file-trees.json",
    JSON.stringify(data, null, 2)
  );
};
