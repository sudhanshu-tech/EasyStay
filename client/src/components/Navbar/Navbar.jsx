import React, { useState, useRef, useContext, useEffect } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/logout', {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);


  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const sendVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/sendVerifyOtp`,
        {
          email: userData.email
        }, // No data to send
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      if (data.success) {
        navigate('/emailVarification');
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className=' bg-blue-900 fixed w-full z-50 '>
      <div className='text-center text-white p-4 icon relative max-w-[1200px] mx-auto px-4 transition-all duration-500 ease-in-out '>
        <ul className={isMenuOpen ? 'show_menu' : 'menu_list'}>
          <li className='cursor-pointer w-20 h-10  hover:text-black text-white pt-1 rounded-md hover:opacity-80  hover:bg-white/70' onClick={() => navigate('/')} >Home</li>
          <li className='cursor-pointer w-20 h-10  hover:text-black text-white pt-1 rounded-md hover:opacity-80  hover:bg-white/70' onClick={toggleMenu}>About</li>
          <li className='cursor-pointer w-40 h-10  hover:text-black text-white pt-1 rounded-md hover:opacity-80  hover:bg-white/70' onClick={() => navigate('/propertyList')}>List Your Property</li>
        </ul>
        {
          userData ?
            <div className='flex items-center  mx-[10px]  relative group cursor-pointer hover:bg-[#909090] p-[3px] hover:rounded-[10px]'>
              <div className='w-[34px] h-[34px] text-center  rounded-full bg-blue-500 p-[5px] '>
                {userData.name[0].toUpperCase()}
                <div className='w-[180px] bg-black rounded-2xl absolute top-[42px] right-0 group-hover:block hidden'>
                  <ul className='list-none m-0 p-2 bg-grey-100 text-sm'>
                    {console.log("In the navbar", userData.
                      isAcountVerified
                    )}
                    {!userData.isAcountVerified && (
                      <li onClick={sendVerifyOtp} className="py-1 px-2 hover:bg-white hover:text-black rounded-2xl cursor-pointer pr-10">
                        Verify Email
                      </li>
                    )}

                    <li onClick={logout} className='py-1 px-2 hover:bg-white hover:text-black rounded-2xl cursor-pointer pr-10'>Logout</li>

                  </ul>
                </div>
              </div>
              <div className='mx-[10px]'>
                <div>
                  <h1 className='font-semibold text-[12px]'>{userData.name}</h1>
                </div>
                <div>
                  <p className='font-semibold text-[10px]'>Welcome Back</p>
                </div>
              </div>
            </div>
            :
            <div>
              <button className='bg-blue-500 w-30 h-10 text-center  rounded-md hover:bg-white hover:text-black cursor-pointer mr-2.5'>Register</button>
              <button onClick={() => navigate('/login')} className='bg-blue-500 w-30 h-10 text-center  rounded-md hover:bg-white hover:text-black cursor-pointer mr-2.5'>Sign In</button>
            </div>

        }
        <FontAwesomeIcon icon={faBars} className='text-2xl cursor-pointer w-[50px] bg-blue-500 p-2 text-center  rounded-md hover:bg-white hover:text-black menu_bar' onClick={() => setIsMenuOpen(!isMenuOpen)} ref={menuRef} />

      </div>
    </div>
  )
}

export default Navbar
