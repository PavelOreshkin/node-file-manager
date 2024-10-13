import { argv, stdin, stdout, exit, cwd, chdir } from "node:process";
import os from "node:os";
import path from "node:path";
import {
  stat,
  readdir,
  open,
  appendFile,
  rename,
  unlink,
  readFile,
} from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

// import { createInterface } from "node:readline/promises";
import { createInterface } from "node:readline";

const OPERATION_ERROR_MESSAGE = "Operation failed";
const INPUT_ERROR_MESSAGE = "Invalid input";

const greeting = () => {
  const userNameByBash = argv
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1];

  const userNameByPowershell = process.env.npm_config_username;

  const userName = userNameByBash || userNameByPowershell || "Guest";

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${cwd()}`);

  return userName;
};

const osModule = (command) => {
  switch (command) {
    case "EOL":
      console.log(JSON.stringify(os.EOL, 0, 0));
      break;
    case "cpus": {
      const cpusAmount = os.cpus().length;
      console.log(`Overall amount of CPUS is ${cpusAmount}`);
      os.cpus().forEach(({ model, speed }, index) => {
        const cpuNumber = `CPU ${index + 1}:${os.EOL}`;
        const modelString = `Model: ${model.trim()}${os.EOL}`;
        const clockRate = `Clock rate: ${(speed / 1000).toFixed(2)} GHz${
          os.EOL
        }`;
        const fullInfo = cpuNumber + modelString + clockRate;
        console.log(fullInfo);
      });
      break;
    }
    case "homedir":
      console.log("Homedir: ", os.homedir());
      break;
    case "username":
      console.log("User name: ", os.userInfo().username);
      break;
    case "architecture":
      console.log("Architecture: ", os.arch());
      break;
    default:
      console.error(INPUT_ERROR_MESSAGE);
      break;
  }
};

const Interface = () => {
  // chdir(os.homedir());
  const rl = createInterface({ input: stdin, output: stdout });

  const userName = greeting();

  rl.on("line", async (input) => {
    try {
      if (input === ".exit") {
        rl.close();
      }

      if (input === "up") {
        const currentDir = cwd();
        const parentDir = path.resolve(currentDir, "..");
        chdir(parentDir);
        return;
      }

      // cd D:\Work
      if (input.startsWith("cd")) {
        const pathToDirectory = input.substring(2).trim();
        chdir(pathToDirectory);
        return;
      }

      if (input === "ls") {
        const currentDir = cwd();
        const items = await readdir(currentDir, { withFileTypes: true });

        const arr = items
          .filter((item) => item.isFile() || item.isDirectory())
          .map((item) => ({
            Name: item.name,
            Type: item.isFile() ? "file" : "directory",
          }))
          .sort((a, b) => {
            if (a.Type === "directory" && b.Type === "file") return -1;
            if (a.Type === "file" && b.Type === "directory") return 1;
            return a.Name.localeCompare(b.Name);
          });

        console.table(arr);

        return;
      }

      if (input.startsWith("os --")) {
        const command = input.split("--")[1];
        osModule(command);
        return;
      }

      // cat D:\Work
      // cat D:\Work\RSshool\2. node-file-manager\src\fileToRead.txt
      if (input.startsWith("cat")) {
        const path = input.substring(3).trim();

        await new Promise((resolve, reject) => {
          const readStream = createReadStream(path);

          readStream.on("data", (chunk) => {
            stdout.write(chunk + os.EOL);
          });
          // .on("error", (err) => {
          //   console.error(OPERATION_ERROR_MESSAGE);
          //   reject(err);
          // })
          // .on("end", () => {
          //   resolve();
          // });
        });
        return;
      }

      // add newFile.txt
      if (input.startsWith("add")) {
        const fileName = input.substring(3).trim();
        const newPath = path.join(cwd(), fileName);
        await appendFile(newPath, "");
        return;
      }

      // rn path_to_file new_filename
      // rn D:\Work\RSshool\2.node-file-manager\node-file-manager\newFile.txt D:\Work\RSshool\2.node-file-manager\node-file-manager\renamedFile.txt
      // rn D:\Work\RSshool\2.node-file-manager\node-file-manager\renamedFile.txt D:\Work\RSshool\2.node-file-manager\newFile.txt
      if (input.startsWith("rn")) {
        const paths = input.substring(2).trim();
        const [oldPath, newPath] = paths.split(" ");
        await rename(oldPath, newPath);
        return;
      }

      // cp path_to_file path_to_new_directory
      // cp D:\Work\RSshool\2.node-file-manager\node-file-manager\renamedFile.txt D:\Work\RSshool\2.node-file-manager\node-file-manager\copyedFile.txt
      if (input.startsWith("cp")) {
        const paths = input.substring(2).trim();
        const [oldPath, newPath] = paths.split(" ");

        const readableStream = createReadStream(oldPath);
        const writableStream = createWriteStream(newPath);

        await readableStream.pipe(writableStream);
        return;
      }

      // mv path_to_file path_to_new_directory
      // mv D:\Work\RSshool\2.node-file-manager\node-file-manager\copyedFile.txt D:\Work\RSshool\2.node-file-manager\node-file-manager\newFile.txt
      if (input.startsWith("mv")) {
        const paths = input.substring(2).trim();
        const [oldPath, newPath] = paths.split(" ");

        const readableStream = createReadStream(oldPath);
        const writableStream = createWriteStream(newPath);

        await readableStream.pipe(writableStream);

        await unlink(oldPath);
        return;
      }

      // rm path_to_file
      // rm D:\Work\RSshool\2.node-file-manager\node-file-manager\newFile.txt
      if (input.startsWith("rm")) {
        const path = input.substring(2).trim();
        await unlink(path);
        return;
      }

      // hash path_to_file
      // hash D:\Work\RSshool\2.node-file-manager\node-file-manager\newFile.txt
      if (input.startsWith("hash")) {
        const path = input.substring(4).trim();
        const data = await readFile(path);
        const hash = createHash("sha256").update(data).digest("hex");
        console.log(hash);
        return;
      }

      // compress path_to_file path_to_destination
      // compress D:\Work\RSshool\2.node-file-manager\node-file-manager\newFile.txt D:\Work\RSshool\2.node-file-manager\node-file-manager\newFileCompressed.br
      if (input.startsWith("compress")) {
        const paths = input.substring(8).trim();
        const [sourcePath, destinationPath] = paths.split(" ");

        const source = createReadStream(sourcePath);
        const destination = createWriteStream(destinationPath);
        const brotliCompress = createBrotliCompress();

        await pipeline(source, brotliCompress, destination);
        return;
      }

      // decompress path_to_file path_to_destination
      // decompress D:\Work\RSshool\2.node-file-manager\node-file-manager\newFileCompressed.br D:\Work\RSshool\2.node-file-manager\node-file-manager\newFileDecompressed.txt
      if (input.startsWith("decompress")) {
        const paths = input.substring(10).trim();
        const [sourcePath, destinationPath] = paths.split(" ");

        const source = createReadStream(sourcePath);
        const destination = createWriteStream(destinationPath);
        const brotliDecompress = createBrotliDecompress();

        await pipeline(source, brotliDecompress, destination);
        return;
      }

      console.error(INPUT_ERROR_MESSAGE);
    } catch (error) {
      console.error(OPERATION_ERROR_MESSAGE);
      console.error(error);
    } finally {
      console.log(`You are currently in ${cwd()}`);
    }
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    exit(0);
  });
};

Interface();
