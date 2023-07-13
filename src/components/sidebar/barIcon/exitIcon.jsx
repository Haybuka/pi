import React, { useContext } from 'react';
import { ReactComponent as Icon } from '../../../images/icons/exit.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const ExitIcon = ({ onClick }) => {
  const navigate = useNavigate();
  const { handleProfileSet } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.clear();
    handleProfileSet({});
    navigate('login');
  };
  return (
    <div onClick={handleLogOut} className="mr-3 cursor-pointer">
      <Icon />
    </div>
  );
};

export default ExitIcon;
