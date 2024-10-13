import { cwd } from "node:process";
import { readdir } from "node:fs/promises";

const list = async () => {
  const currentDir = cwd();
  const items = await readdir(currentDir, { withFileTypes: true });

  const arr = items
    .filter((item) => item.isFile() || item.isDirectory())
    .map((item) => ({
      Name: item.name,
      Type: item.isFile() ? "file" : "directory",
    }))
    .sort((a, b) => {
      if (a.Type === "directory" && b.Type === "file") return -1;
      if (a.Type === "file" && b.Type === "directory") return 1;
      return a.Name.localeCompare(b.Name);
    });

  console.table(arr);
};

export default list;
