import React from 'react'
import searchIcon from '../assets/search.png'

const Search = ({value, onChange}) => {
  return (
      <div className='w-full h-full flex justify-center items-center'>
          <div id='search' className='w-full h-[50%] flex justify-center items-center mx-[3%] bg-[#121212] rounded-full overflow-hidden'>
              <div id='search-input' className='w-[95%]'>
          <input id='search-input' className=' w-full h-full bg-[#121212] text-white outline-none p-[3%] ' type="text" placeholder='Cari Kuliner...' value={value} onChange={(e) => onChange(e.target.value)} />
              </div>
              <button id='search-icon' className='w-[5%]'>
                 <img className='w-[25px] h-[25px] cursor-pointer' src={searchIcon} alt="" /> 
              </button>
          </div>
    </div>
  )
}

export default Search