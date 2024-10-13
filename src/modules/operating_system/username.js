import { userInfo } from "node:os";

const username = () => {
  console.log("User name: ", userInfo().username);
};

export default username;
