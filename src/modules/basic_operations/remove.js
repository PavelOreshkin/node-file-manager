import { unlink } from "node:fs/promises";

const remove = (path) => unlink(path);

export default remove;
