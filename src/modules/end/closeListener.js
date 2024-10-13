import { exit } from "node:process";

const closeListener = ({ readlineInterface, userName }) => {
  readlineInterface.on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    exit(0);
  });
};

export default closeListener;
