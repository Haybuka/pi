import React from 'react';

const GridWrapper = ({ children }) => {
  return <aside className="grid grid-cols-12 gap-3 my-6">{children}</aside>;
};

export default GridWrapper;
