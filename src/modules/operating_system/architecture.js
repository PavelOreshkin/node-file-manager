import { arch } from "node:os";

const architecture = () => {
  console.log("Architecture: ", arch());
};

export default architecture;
