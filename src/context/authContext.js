import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const [isLogOut, setIsLogout] = useState(false)

  const handleProfileSet = (user) => {
    setProfile(user)
  }

  const handleLogOut = () => {
    localStorage.clear();
    handleProfileSet({});
    navigate('login');
    setIsLogout(false)
  };

  const handleSetLogOut = () => {
    setIsLogout(prev => !prev)
  }

  const values = { profile, isLogOut, handleProfileSet, handleLogOut, handleSetLogOut }

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}