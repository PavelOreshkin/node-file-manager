import { chdir } from "node:process";

const cd = (path) => {
  chdir(path);
};

export default cd;
