# file-tree-view

`file-tree-view` is a Node.js package designed to generate and visualize file tree structures. It helps you display and interact with file and directory hierarchies in a clear and organized manner.

## Features

- **Generate File Trees**: Create a visual representation of your directory structure.
- **Easy Integration**: Simple to include in your Node.js applications.
- **Flexible Usage**: Supports various directory paths and structures.

## Installation

You can install `file-tree-view` from npm. Run the following command:

```bash
npm install file-tree-view
```

## Example Script

Here's a complete example script showing how to use `file-tree-view` to generate and visualize a file tree. This script includes configuration options to customize the file tree generation.

```javascript
const path = require("path");
const fileTreeView = require("file-tree-view/dist").default;

// Define the root directory for the file tree
// You can customize root path
const root = path.join(__dirname);

// Configuration object for fileTreeView
const config = {
  rootPath: root, // The root directory to generate the file tree from
  projectName: "file-tree-view", // The name of your project
  // Optional configuration start
  ignoreDir: [
    // Default skip directories -> node_modules, .git, file-tree-view
    path.join(root, "directory_name"), // Directories to ignore
  ],
  saveAs: {
    html: false, // Whether to save the file tree as an HTML file
    htmlPath: "", // Path to save the HTML file if `html` is true
    json: false, // (Default) Whether to save the file tree as a JSON file
    jsonPath: "", // Path to save the JSON file if `json` is true
  },
};

// Generate and visualize the file tree
fileTreeView(config);
```

**⚠️ Warning: Important Usage Instructions**

When generating a file, **make sure to call the function** responsible for this task. **After the file generation is complete, remember to disable the function** to avoid unintended operations. Failure to follow these steps may lead to unexpected behavior or performance issues.
