import React, { createContext, useState } from 'react'

export const ThemeContext = createContext({})
export const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  const handleModeSet = () => setIsDark(prev => !prev)
  const values = { isDark, handleModeSet }
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  )
}

