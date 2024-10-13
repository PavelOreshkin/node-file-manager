import { createInterface } from "node:readline";
import { stdin, stdout, chdir } from "node:process";
import { homedir } from "node:os";
import { greeting } from "./greeting.js";

const init = () => {
  chdir(homedir());
  const userName = greeting();
  const readlineInterface = createInterface({ input: stdin, output: stdout });
  return {
    readlineInterface,
    userName,
  };
};

export default init;
