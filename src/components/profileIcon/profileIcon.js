import React from 'react'
import { ReactComponent as Icon } from '../../images/icons/profile.svg'
import { useNavigate } from 'react-router-dom'

const ProfileIcon = ({ onClick }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/profile')} className='mr-3 cursor-pointer'>
      <Icon />
    </div>
  )
}

export default ProfileIcon