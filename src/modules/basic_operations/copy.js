import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { unlink } from "node:fs/promises";

const copy = (oldPath, newPath) => {
  const readableStream = createReadStream(oldPath);
  const writableStream = createWriteStream(newPath);

  return pipeline(readableStream, writableStream).catch((err) => {
    unlink(newPath);
    throw err;
  });
};

export default copy;
