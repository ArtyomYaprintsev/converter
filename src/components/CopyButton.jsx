import React, { useEffect, useState } from "react";

import CopyIcon from "./CopyIcon";

const CopyButton = ({ onClick, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isCopied) timeoutId = setTimeout(() => setIsCopied(false), 1000);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <button
      type='button'
      className={`copy-btn btn ${isCopied ? "copied" : ""}`.trim()}
      onClick={() => {
        setIsCopied(true);
        onClick();
      }}
      {...props}
    >
      <div className='decoration'>
        <CopyIcon />
      </div>
      <div className='text'>{isCopied ? "Скопировано" : "Скопировать"}</div>
    </button>
  );
};

export default CopyButton;
