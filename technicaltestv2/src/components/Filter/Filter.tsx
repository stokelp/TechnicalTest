import React, { useMemo } from "react";
import { Input, Dropdown } from "antd";

const Filter: React.FC<
  {
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    styles: string[]
  }> = ({ setFilter, styles }) => {
    console.log(styles);
    const items = useMemo(() => {
      return styles.map((style, id) => {
        return {
          key: id,
          label: (<a>{style}</a>)
        }
      });
    }, [styles]);
  return (
    <>
      <Dropdown></Dropdown>
      <Input></Input>
    </>
  );
};

export default Filter;
