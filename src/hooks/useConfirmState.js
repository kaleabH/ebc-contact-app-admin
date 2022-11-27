import { useState } from "react";

const useConfirmState = () => {
  const [visible, setVisible] = useState(false);

  const setVisiblity = (value) => {
    setVisible(value);
  };
  return [visible, setVisiblity];
};

export default useConfirmState;
