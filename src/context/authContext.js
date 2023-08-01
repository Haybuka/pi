import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})
export const AuthContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({})

  const handleProfileSet = (user) => {
    // const user = JSON.parse(localStorage.getItem('__profile__'))
    setProfile(user)
  }
  const values = { profile, handleProfileSet }

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}