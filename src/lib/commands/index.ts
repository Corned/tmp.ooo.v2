import echo from "./echo";
import helloworld from "./helloworld";
import rpn from "./rpn";

const commands = {
  echo,
  helloworld,
  rpn,
};

export default commands as Record<string, (...args: string[]) => string>;