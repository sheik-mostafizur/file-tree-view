export interface Config {
  rootPath: string;
  projectName: string;
  ignoreDir?: Array<string>;
  saveAs?: {
    html?: boolean;
    htmlPath?: string;
    json?: boolean;
    jsonPath?: string;
  };
}

export interface FileTreeNode {
  name: string;
  path: string;
  type: "directory" | "file";
  children?: FileTreeNode[];
}
