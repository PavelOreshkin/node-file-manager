import { cwd } from "node:process";
import { join } from "node:path";
import { rename as nodeRename } from "node:fs/promises";

const rename = (pathToFile, newFileName) => {
  const newPath = join(cwd(), newFileName);
  return nodeRename(pathToFile, newPath);
};

export default rename;
