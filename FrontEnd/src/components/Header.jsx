import React from 'react'
import { useNavigate
   } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate("/")}>

      Header/Navbar
    </div>
  )
}

export default Header
