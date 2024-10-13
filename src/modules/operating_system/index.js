import architecture from "./architecture.js";
import cpus from "./cpus.js";
import eol from "./eol.js";
import homedir from "./homedir.js";
import username from "./username.js";
import { INPUT_ERROR_MESSAGE } from "../../constants.js";

const oparationSystem = (input) => {
  if (!input || !input.startsWith("--")) {
    return console.error(INPUT_ERROR_MESSAGE);
  }
  const command = input.substring(2);
  switch (command) {
    case "EOL":
      eol();
      break;
    case "cpus": {
      cpus();
      break;
    }
    case "homedir":
      homedir();
      break;
    case "username":
      username();
      break;
    case "architecture":
      architecture();
      break;
    default:
      console.error(INPUT_ERROR_MESSAGE);
      break;
  }
};

export default oparationSystem;
