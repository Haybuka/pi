import React from 'react';
import cls from 'classnames';
import styles from './button.module.css';
const Button = ({
  text,
  classProp,
  type = 'submit',
  isSubmitting,
  handleClick,
}) => {
  return (
    <>
      {isSubmitting ? (
        <div className={styles.loader}></div>
      ) : (
        <button
          type={type}
          onClick={handleClick}
          className={cls(
            'w-full bg-[#002D62] text-white py-3 rounded-full uppercase text-sm cursor-pointer',
            classProp
          )}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
