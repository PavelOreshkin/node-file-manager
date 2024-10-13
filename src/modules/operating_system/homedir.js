import { homedir as nodeHomedir } from "node:os";

const homedir = () => {
  console.log("Homedir: ", nodeHomedir());
};

export default homedir;
