import { argv, cwd } from "node:process";

export const greeting = () => {
  const userNameByBash = argv
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1];

  const userNameByPowershell = process.env.npm_config_username;

  const userName = userNameByBash || userNameByPowershell || "Guest";

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${cwd()}`);

  return userName;
};
