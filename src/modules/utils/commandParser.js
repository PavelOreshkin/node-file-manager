const commandParser = (input) => {
  const [command, firstArg, secondArg] = input.trim().split(" ");
  return { command, firstArg, secondArg };
};

export default commandParser;
