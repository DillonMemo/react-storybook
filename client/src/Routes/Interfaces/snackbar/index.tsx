import React from "react";

export type SnackBarProps = {};

const SnackBar: React.FC<SnackBarProps> = ({}) => {
  return (
    <div>
      <button>Show SnackBar</button>
      <p>
        react-notification lib를 사용하여 구현 (
        <a href="https://github.com/minhtranite/react-notifications">react-notification</a>)
      </p>
    </div>
  );
};

export default SnackBar;
