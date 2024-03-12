import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
const GlobalFilter = ({
  filter,
  setFilter,
  placeholder = 'Search categories',
}) => {
  //for debounce
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
    //delay at which the global takes to filter, in other to optimize.
  }, 1000);

  return (
    <label className="block relative floated-label w-1/3">
      {/* for debounce */}
      <input
        type="search"
        name="search"
        className="w-full py-2 px-4 outline-none focus:outline-transparent shadow-md cursor-pointer rounded-2xl border-none"
        placeholder="John Doe"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
        {placeholder}
      </p>
    </label>
  );
};

export default GlobalFilter;
