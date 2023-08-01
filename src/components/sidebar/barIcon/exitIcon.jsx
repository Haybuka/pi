import React, { useContext } from 'react';
import { ReactComponent as Icon } from '../../../images/icons/exit.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const ExitIcon = ({ onClick, visible }) => {
  const navigate = useNavigate();
  const { handleProfileSet } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.clear();
    handleProfileSet({});
    navigate('login');
  };
  return (
    <span
      onClick={handleLogOut}
      className="mr-3 cursor-pointer flex items-center"
    >
      <Icon />
      {visible && <span className="ml-3">Logout</span>}
    </span>
  );
};

export default ExitIcon;
