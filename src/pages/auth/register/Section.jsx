import React from 'react';

const Section = ({ children, title }) => {
  return (
    <section className="border rounded-lg p-3 my-6 relative">
      <h3 className="absolute -top-3 bg-white px-4 uppercase font-medium">
        {title}
      </h3>
      {children}
    </section>
  );
};

export default Section;
