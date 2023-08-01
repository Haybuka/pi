import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

const useAuth = () => {
  // const { profile } = useContext(AuthContext);

  const userProfile = JSON.parse(localStorage.getItem("__profile__"))
  // console.log(userProfile, "context")
  return { userProfile }

}

export default useAuth