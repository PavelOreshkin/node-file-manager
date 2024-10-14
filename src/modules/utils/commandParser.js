const commandParser = (input) => {
  let separator = " ";
  if (input.includes('"')) separator = '"';
  if (input.includes("'")) separator = "'";

  const [command, firstArg, secondArg] = input
    .split(separator)
    .map((item) => item.trim());

  return {
    command,
    firstArg,
    secondArg,
  };
};

export default commandParser;
