import React from 'react'

const Bio = () => {
  return (
      <div className='w-full h-screen flex justify-center items-center'>
          <div className='w-[500px] bg-[#121212] rounded-[20px] flex flex-col gap-5 p-10'>
              <input type="text" className='bg-transparent text-white outline-none' placeholder='I might not be where I want to be yet, but I get closer everyday.' />
              <div className='w-full flex justify-end'>
              <button className=' text-white bg-[#f15e3c] py-2 px-3 rounded-full'>
                  Ubah bio
              </button>
              </div>
              
          </div>
    </div>
  )
}
export default Bio