import React from 'react'
import room2 from "../../assets/roomImg2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div className='max-w-[1200px] mx-auto px-4'>
            <div className='w-full h-[87vh]  flex items-center justify-between '>
                <div className='w-[48%] h-[80%] rounded-md shadow-lg flex flex-col items-center justify-center relative z-[-1]'>
                    <img src={room2} alt="room image" className='w-[58%] h-[80%] rounded-[100%]  ' />
                    <div className='w-[40%] h-[40%] bg-white rounded-md shadow-lg opacity-80 flex flex-col items-center justify-center absolute top-[33%] left-[0]'>
                        <h1 className='font-bold'>24 hours services</h1>
                        <p>50+ employees</p>

                        <div className='w-[80%] h-[20%]  rounded-md opacity-80 flex items-center justify-center mt-4'>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <p className='ml-4'>5/5</p>
                        </div>

                    </div>
                </div>

                <div className=' w-[48%] h-[80%] rounded-md shadow-lg flex flex-col items-center justify-center '>
                    <h1 className='text-3xl font-bold pb-4 text-start'>About us</h1>
                    <p className='w-[80%] font-semibold '>At Easy Stay, we make hotel booking simple, fast, and hasslle-free. Find, compare, and book your perfect stay with an intuitive experience designed for effortless travel planning.</p>
                    <button className='bg-blue-500 w-30 h-10 text-center  rounded-md mt-10 hover:bg-red-500 hover:text-white cursor-pointer'>Read More</button>
                </div>
            </div>

            
                <div className='w-full  flex flex-col items-center justify-center mb-3  '>
                    <h1 className='text-3xl font-bold pb-4 text-start'>Our Living Rooms and Suites</h1>

                    <div className='grid grid-cols-3 gap-4 w-[80%] xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 max-sm:items-center '>
                        <div className=' rounded-md shadow-lg flex flex-col items-center justify-center relative w-[275px] h-auto '>
                            <img src={room2} alt="" />
                            <div className='w-[80%] shadow-2xl flex items-center justify-center bg-amber-100 p-3 absolute top-[160px] left-[34px] rounded-md'>
                                <p>size</p>
                                <p>capacity</p>
                            </div>
                            <div className='w-full  rounded-md opacity-80 flex flex-col items-center justify-center mt-[30px]'>
                                <h1 className='text-2xl font-bold '>Living Room</h1>
                                <p className='font-semibold p-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                            </div>
                            <button className='bg-blue-500 w-30 h-10 text-center  rounded-md mb-2 hover:bg-red-500 hover:text-white cursor-pointer'>Book Now</button>
                        </div>
                        <div className=' rounded-md shadow-lg flex flex-col items-center justify-center relative w-[275px] h-[400px]'>
                            <img src={room2} alt="" />
                            <div className='w-[80%] shadow-2xl flex items-center justify-center bg-amber-100 p-3 absolute top-[160px] left-[34px] rounded-md'>
                                <p>size</p>
                                <p>capacity</p>
                            </div>
                            <div className='w-full  rounded-md opacity-80 flex flex-col items-center justify-center mt-[30px]'>
                                <h1 className='text-2xl font-bold '>Living Room</h1>
                                <p className='font-semibold p-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                                <button className='bg-blue-500 w-30 h-10 text-center  rounded-md mb-2 hover:bg-red-500 hover:text-white cursor-pointer'>Book Now</button>
                            </div>
                        </div>
                        <div className=' rounded-md shadow-lg flex flex-col items-center justify-center relative w-[275px] h-[400px]'>
                            <img src={room2} alt="" />
                            <div className='w-[80%] shadow-2xl flex items-center justify-center bg-amber-100 p-3 absolute top-[160px] left-[34px] rounded-md'>
                                <p>size</p>
                                <p>capacity</p>
                            </div>
                            <div className='w-full  rounded-md opacity-80 flex flex-col items-center justify-center mt-[30px]'>
                                <h1 className='text-2xl font-bold '>Living Room</h1>
                                <p className='font-semibold p-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                            </div>
                            <button className='bg-blue-500 w-30 h-10 text-center  rounded-md mb-2 hover:bg-red-500 hover:text-white cursor-pointer'>Book Now</button>
                        </div>

                    </div>

                </div>
        </div>
    )
}

export default About
