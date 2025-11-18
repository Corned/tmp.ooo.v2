import echo from "./echo";
import helloworld from "./helloworld";

const commands = {
  echo,
  helloworld,
};

export default commands as Record<string, (...args: string[]) => string>;