import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({text}) => {
  return (
    
    <button type='submit' className='w-[100%] h-9 text-white text-[15px] rounded-[20px] bg-[#f15e3c] hover:bg-transparent hover:border border-[#f15e3c]  flex justify-center items-center'>
        {text}
    </button>

  )
}

export default Button