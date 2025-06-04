import React from 'react'

const SignInPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full relative bg-gradient-to-br from-[#95d4f5e6] to-[#27e5c8]'>
            <div className='absolute top-0 left-0 w-full '></div>
                <div className='flex flex-col items-center justify-center w-[500px] h-[450px] bg-white shadow-lg rounded-md z-1'>
                <h1 className='text-2xl font-bold mb-5'>Create Account</h1>
                <form className='flex flex-col items-start justify-center'>
                    <label htmlFor="name" className='font-semibold text-start'>Full Name</label>
                    <input type="text" placeholder='Enter your Full Name ' name='name' className='mb-4 border-2 w-[400px] h-[40px] p-2 rounded-md' />
                    <label htmlFor="email" className='font-semibold text-start'>Email</label>
                    <input type="email" placeholder='Enter your email' name='email' className='mb-4 border-2 w-[400px] h-[40px] p-2 rounded-md' />
                    <label htmlFor="password" className='font-semibold text-start'>Mobile Number</label>
                    <input type="mobile" placeholder='Enter your Mobile Number' name='password' className='mb-4 mt-1 border-2 w-[400px] h-[40px] p-2 rounded-md' />
                    <button className='bg-blue-500 w-[400px] h-10 text-center  rounded-md mt-5 hover:bg-red-500 hover:text-black cursor-pointer'>Continue</button>
                </form>
            </div>

        </div>
    )
}

export default SignInPage
