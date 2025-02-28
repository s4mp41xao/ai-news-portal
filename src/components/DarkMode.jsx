import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material'

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    document.documentElement.classList.toggle('dark', newMode)
    document.body.style.backgroundColor = newMode ? '#333' : '#fff'
    document.body.style.color = newMode ? '#fff' : '#000'
  }

  return (
    <IconButton onClick={toggleDarkMode}>
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}

export default DarkModeToggle
