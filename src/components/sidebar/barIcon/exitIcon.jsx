import React, { useContext } from 'react';
import { ReactComponent as Icon } from '../../../images/icons/exit.svg';
import { AuthContext } from '../../../context/authContext';

const ExitIcon = ({ onClick, visible }) => {
  const { handleSetLogOut } = useContext(AuthContext);

  // const handleLogOut = () => {
  //   localStorage.clear();
  //   handleProfileSet({});
  //   navigate('login');
  // };
  return (
    <span
      onClick={handleSetLogOut}
      className="mr-3 cursor-pointer flex items-center"
    >
      <Icon />
      {visible && <span className="ml-3">Logout</span>}
    </span>
  );
};

export default ExitIcon;
