import { useState } from 'react';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';

const Inputs = ({ type, name, value, handleInputChange, handleBlur, error, displayName, maxLength, disabled, rest }) => {

  const handleInput = (event) => {
    //Function to cut and check maxlength of a phone number
    const phoneLength = 11;
    switch (type) {
      case 'text':
        handleInputChange(name, event.target.value);
        break;
      case 'number':

        handleInputChange(name, Number(event.target.value));

        break;
      default:
        handleInputChange(name, event.target.value);
        break;
    }
  };

  const [toggleType, setToggleType] = useState(false)

  const handleTypeToggle = () => {
    setToggleType(prev => !prev)
  }

  return (

    <div className=" w-full">
      <label className="block relative floated-label w-full">
        <input
          type={!toggleType ? type : 'text'}
          name={name}
          className="w-full py-3 px-4 outline-none focus:outline-none shadow-lg rounded-lg"
          placeholder="John Doe"
          value={value}
          disabled={disabled}
          onChange={(e) => type !== "number" ? handleInputChange(name, e.target.value) : handleInputChange(name, Number(e.target.value))}
          onBlur={handleBlur}
          maxLength={maxLength}
          {...rest}
        />
        <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">{displayName}</p>
        {type === "password" && (
          <span onClick={handleTypeToggle} className='p-1 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'>
            <EyeSlash />
          </span>
        )}
      </label>
      {error && (
        <span className="text-[14px] text-red-500 block mt-1 capitalize">{`${error}`}</span>
      )}
    </div>
  );
};

export default Inputs;
