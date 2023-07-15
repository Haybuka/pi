import React from 'react';

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span className="text-black inline-block bg-black-400">
      Search :
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-red-400"
      />
    </span>
  );
};

export default ColumnFilter;
