import { memo } from "react";

const Icon = memo(({ name, className = "", ...otherProps }) => {
  return <i {...otherProps} className={`${name} ${className}`}></i>;
});

export default Icon;
