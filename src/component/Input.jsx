import React from 'react'

const Input = ({src, placeholder, type, value, onChange}) => {
  return (
          <div className='w-[100%] h-[40px] rounded-[20px] flex overflow-hidden'>
              <div className='bg-[#121212] w-[12%] h-full flex justify-center items-center '>
              <img className='w-[15px] h-[15px]' src={src} alt="" />
              </div>
          <div className='w-[88%] h-full flex items-center'>
                  <input className='h-full w-full bg-[#121212] outline-none text-white text-[15px]' type={type} placeholder={placeholder} value={value} onChange={onChange} />
              </div>
        </div>
  )
}

export default Input