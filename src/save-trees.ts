import { promises as fs } from "fs";
import { FileTreeNode } from "./types";

async function checkDirectoryExists(dirPath: string) {
  try {
    await fs.access(dirPath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export default (data: FileTreeNode[], path = "") => {
  let savePath = path;

  if (!path.endsWith("/") && path) {
    savePath = savePath + "/";
  }

  const json = async () => {
    try {
      await fs.writeFile(
        savePath + "file-trees.json",
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const html = async () => {
    let treeData = `const treeData = ` + JSON.stringify(data);

    const htmlCSS = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Treeify</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        overflow: hidden;
      }

      #tree-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        overflow: auto;
        margin: auto;
      }

      .tree ul {
        list-style-type: none;
        padding-left: 20px;
      }

      .tree li {
        margin: 5px 0;
      }

      .tree .file {
        color: #555;
      }

      .tree .folder::before {
        content: "📁 ";
      }

      .tree .file::before {
        content: "📄 ";
      }
    </style>
  </head>
  <body>
    <div id="tree-container" class="tree"></div>
    <script src="tree-data.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        function createTree(data) {
          const ul = document.createElement("ul");

          data.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item.name;
            li.className = item.type;

            if (item.type === "directory") {
              li.classList.add("folder");
              if (item.children) {
                li.appendChild(createTree(item.children));
              }
            } else {
              li.classList.add("file");
            }

            ul.appendChild(li);
          });

          return ul;
        }

        document
          .getElementById("tree-container")
          .appendChild(createTree(treeData));
      });
    </script>
  </body>
</html>
`;

    try {
      const isExist = await checkDirectoryExists(savePath + "treeify-html");

      if (isExist) {
        await fs.writeFile(savePath + "treeify-html/tree-data.js", treeData);
        await fs.writeFile(savePath + "treeify-html/index.html", htmlCSS);
      } else {
        if (savePath) {
          fs.mkdir(savePath + "treeify-html");
        } else {
          fs.mkdir("treeify-html");
        }
        await fs.writeFile(savePath + "treeify-html/tree-data.js", treeData);
        await fs.writeFile(savePath + "treeify-html/index.html", htmlCSS);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { json, html };
};
