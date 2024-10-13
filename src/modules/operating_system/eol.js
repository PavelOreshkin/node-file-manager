import { EOL } from "node:os";

const eol = () => {
  console.log(JSON.stringify(EOL, 0, 0));
};

export default eol;
