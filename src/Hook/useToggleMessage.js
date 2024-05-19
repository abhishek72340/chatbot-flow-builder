import { useState } from "react";

export const useToggleMessage = () => {
  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle(false);
  };
  return { toggleHandler, toggle };
};
