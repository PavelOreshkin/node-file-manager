import { cpus as cpusNode, EOL } from "node:os";

const cpus = () => {
  const cpusAmount = cpusNode().length;
  console.log(`Overall amount of CPUS is ${cpusAmount}`);
  cpusNode().forEach(({ model, speed }, index) => {
    const cpuNumber = `CPU ${index + 1}:${EOL}`;
    const modelString = `Model: ${model.trim()}${EOL}`;
    const clockRate = `Clock rate: ${(speed / 1000).toFixed(2)} GHz${EOL}`;
    const fullInfo = cpuNumber + modelString + clockRate;
    console.log(fullInfo);
  });
};

export default cpus;
