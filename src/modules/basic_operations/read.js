import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { EOL } from "node:os";

const read = (path) =>
  new Promise((resolve, reject) => {
    const readStream = createReadStream(path);
    readStream
      .on("data", (chunk) => stdout.write(chunk + EOL))
      .on("error", (err) => reject(err))
      .on("end", () => resolve());
  });

export default read;
