import React from 'react'
import theme from '../../../assets/theme.jpg';

const HotelSign = () => {
  return (
    <div className=' h-screen w-full relative flex flex-col items-center justify-center'>
      <div className='absolute top-0 left-0 w-full h-1/2 bg-blue-900'></div>

      <div className='flex flex-col items-center justify-center w-[500px] h-[450px]  shadow-lg rounded-md z-2 bg-white'>
        <h1 className='text-2xl font-bold mb-[11px]'>Sign in to manage your property</h1>
        <p className='text-sm font-semibold mb-[34px]'>Welcome back! Please enter your details</p>
        <div>
            <form className='flex flex-col items-start justify-center'>
                <label htmlFor="name" className='font-semibold text-start text-black'>Username/Email address</label>
                <input type="text" placeholder='Enter your username or email ' name='name' className='mb-4 border-2 w-[400px] h-[40px] p-2 rounded-md bg-white' />
                <label htmlFor="email" className='font-semibold text-start text-black'>Password</label>
                <input type="email" placeholder='Enter your password' name='email' className='mb-4 border-2 w-[400px] h-[40px] p-2 rounded-md bg-white'  />

                <div className=' w-[400px] text-right text-sm font-semibold mt-[-15px]'>
                    <h1>Forgot your Password</h1>
                </div>
    
                <button className='bg-blue-500 w-[400px] h-10 text-center  rounded-md mt-5 hover:bg-red-500 hover:text-black cursor-pointer'>Sign In</button>

                <div className='flex items-center justify-center mt-5 w-[400px]'>
                    <p>New to Connect?</p>
                    <h1 className='font-semibold'>Register</h1>
                </div>
            </form>
        </div>
      </div>

      </div>
    
  )
}

export default HotelSign
