import { init } from "./modules/init/index.js";
import { close, closeListener } from "./modules/end/index.js";
import { cd, list, up } from "./modules/navigation/index.js";
import oparationSystem from "./modules/operating_system/index.js";
import {
  copy,
  create,
  move,
  read,
  remove,
  rename,
} from "./modules/basic_operations/index.js";
import { hashCalculation } from "./modules/hash/index.js";
import { compress, decompress } from "./modules/archivation/index.js";
import { INPUT_ERROR_MESSAGE, OPERATION_ERROR_MESSAGE } from "./constants.js";
import { afterEveryLine, commandParser } from "./modules/utils/index.js";

const Interface = () => {
  const { readlineInterface, userName } = init();

  readlineInterface.on("line", async (input) => {
    const { command, firstArg, secondArg } = commandParser(input);

    try {
      switch (command) {
        case ".exit":
          close(readlineInterface);
          break;

        case "up":
          up();
          break;
        case "cd":
          cd(firstArg);
          break;
        case "ls":
          await list();
          break;

        case "os":
          oparationSystem(firstArg);
          break;

        case "cat":
          await read(firstArg);
          break;
        case "add":
          await create(firstArg);
          break;
        case "rn":
          await rename(firstArg, secondArg);
          break;
        case "cp":
          await copy(firstArg, secondArg);
          break;
        case "mv":
          await move(firstArg, secondArg);
          break;
        case "rm":
          await remove(firstArg);
          break;

        case "hash":
          await hashCalculation(firstArg);
          break;

        case "compress":
          await compress(firstArg, secondArg);
          break;
        case "decompress":
          await decompress(firstArg, secondArg);
          break;
        default:
          console.error(INPUT_ERROR_MESSAGE);
          break;
      }
    } catch (error) {
      console.error(OPERATION_ERROR_MESSAGE);
    } finally {
      afterEveryLine();
    }
  });

  closeListener({ readlineInterface, userName });
};

Interface();
