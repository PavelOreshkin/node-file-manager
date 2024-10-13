import { cwd } from "node:process";
import { join } from "node:path";
import { appendFile } from "node:fs/promises";

const create = (newFileName) => {
  const newPath = join(cwd(), newFileName);
  appendFile(newPath, "");
};

export default create;
