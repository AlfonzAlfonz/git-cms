import React, { FC } from "react";
import { useLocalStorage } from "utils/useLocalStorage";

const DynamicForm: FC<{file: string; filename: string}> = ({ filename, file }) => {
  const [value, setValue] = useLocalStorage(filename, file);

  return (
    <textarea value={value} onChange={e => setValue(e.target.value)} />
  );
};

export default DynamicForm;
