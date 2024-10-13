import { chdir, cwd } from "node:process";
import { resolve } from "node:path";

const up = () => {
  const currentDir = cwd();
  const parentDir = resolve(currentDir, "..");
  if (currentDir === parentDir) throw new Error();
  chdir(parentDir);
};

export default up;
