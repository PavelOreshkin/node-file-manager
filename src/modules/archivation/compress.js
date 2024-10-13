import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { unlink } from "node:fs/promises";

const compress = (sourcePath, destinationPath) => {
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  const brotliCompress = createBrotliCompress();

  return pipeline(source, brotliCompress, destination).catch((err) => {
    unlink(destinationPath);
    throw err;
  });
};

export default compress;
