import { cwd } from "node:process";

const afterEveryLine = () => {
  console.log(`You are currently in ${cwd()}`);
};

export default afterEveryLine;
