import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Navbar from './components/navbar/navbar.jsx'
import Content from './components/content/content.jsx'

function App() {

  return (
    <div className='home'>
      <Navbar/>
      <Content/>      
    </div>
  )
}

export default App
