import { useState } from "react";

export const useToggleValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleToggle = () => {
    setValue(!value);
  };
  const handleSetTrue = () => {
    setValue(true);
  };
  const handleSetFalse = () => {
    setValue(false);
  };

  return {
    value,
    toggle: handleToggle,
    setTrue: handleSetTrue,
    setFalse: handleSetFalse
  };
};
