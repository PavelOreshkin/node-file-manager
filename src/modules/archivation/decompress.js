import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { unlink } from "node:fs/promises";

const decompress = (sourcePath, destinationPath) => {
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);
  const brotliDecompress = createBrotliDecompress();

  return pipeline(source, brotliDecompress, destination).catch((err) => {
    unlink(destinationPath);
    throw err;
  });
};

export default decompress;
