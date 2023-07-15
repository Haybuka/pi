import React from 'react';
import { ReactComponent as Icon } from '../../../images/icons/arrowRight.svg';

const RightIcon = ({ text }) => {
  return (
    <div className="ml-3 cursor-pointer flex items-center">
      <Icon />
      <p className="ml-3">{text}</p>
    </div>
  );
};

export default RightIcon;
