import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { unlink } from "node:fs/promises";
import { join } from "node:path";

const move = async (pathToFile, pathToDestinationDir) => {
  try {
    const index = pathToFile.lastIndexOf("\\");
    if (index === -1) throw new Error();

    const copiedFileName = pathToFile.substring(index + 1);
    const newFilePath = join(pathToDestinationDir, copiedFileName);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(newFilePath);

    await pipeline(readableStream, writableStream);
    await unlink(pathToFile);
  } catch (error) {
    throw error;
  }
};

export default move;
