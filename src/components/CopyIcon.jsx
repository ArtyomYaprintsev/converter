import React from "react";

const CopyIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='28'
      viewBox='0 0 25 28'
      fill='none'
    >
      <path d='M9 22H1V1H16V6' stroke='black' strokeWidth='1.5' />
      <path
        className='filler'
        d='M9 27V6H24V27H9Z'
        fill='rgba(255,0,0,0)'
        stroke='black'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export default CopyIcon;
