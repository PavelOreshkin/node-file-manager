import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const hashCalculation = async (path) => {
  const data = await readFile(path);
  const hash = createHash("sha256").update(data).digest("hex");
  console.log(hash);
};

export default hashCalculation;
