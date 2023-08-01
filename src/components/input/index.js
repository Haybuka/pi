import React from 'react';


const Inputs = ({ type, name, value, handleInputChange, handleBlur, error, displayName, maxLength, rest }) => {

  const handleInput = (event) => {
    //Function to cut and check maxlength of a phone number
    const phoneLength = 11;
    switch (type) {
      case 'text':
        handleInputChange(name, event.target.value);
        break;
      case 'number':
        // let checkedNum = `${event.target.value}`.slice(0, phoneLength);
        handleInputChange(name, Number(event.target.value));

        break;
      default:
        handleInputChange(name, event.target.value);
        break;
    }
  };



  return (

    <div className=" w-full">
      <label className="block relative floated-label w-full">
        <input
          type={type}
          name={name}
          className="w-full py-3 px-4 outline-none focus:outline-none shadow-lg rounded-2xl"
          placeholder="John Doe"
          value={value}
          // onChange={handleInput}
          onChange={(e) => type !== "number" ? handleInputChange(name, e.target.value) : handleInputChange(name, Number(e.target.value))}
          onBlur={handleBlur}
          maxLength={maxLength}
          {...rest}
        />
        <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">{displayName}</p>
      </label>
      {error && (
        <span className="text-[14px] text-red-500 block mt-1 capitalize">{`${error}`}</span>
      )}
    </div>
  );
};

export default Inputs;
