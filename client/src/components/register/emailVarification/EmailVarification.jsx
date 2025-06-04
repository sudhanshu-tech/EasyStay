import React, { useState, useRef, useEffect, useContext, use } from 'react'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const OTP_DIGITS_COUNT = 6;

const EmailVarification = () => {

  const {backendUrl,isLoggedIn,userData, getUserData} = useContext(AppContext);
  const refArr = useRef([]);
  const navigate = useNavigate();

  const [inputArray, setInputArray] = useState(new Array(OTP_DIGITS_COUNT).fill(""));
  

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  const handleChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }
    console.log(value);
    const newValue = value.trim();
    const newArr = [...inputArray];
    newArr[index] = newValue.slice(-1);
    setInputArray(newArr);

    newValue && refArr.current[index + 1]?.focus();
  }

  const handleOneKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedArray = pastedData.split('');
   pastedArray.forEach((char, index) => {
     if(refArr.current[index]) {
       refArr.current[index].value = char;
     }
   })
  }

  const onSubmitHandler = async(e) => {
    try{
      e.preventDefault();
      const otpArray = refArr.current.map(input => input.value);
      const otp = otpArray.join('');

      const {data} = await axios.post(backendUrl + '/api/auth/verifyAccount',{otp}, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
      
    }
  }
  useEffect(() => {
    isLoggedIn && userData.isAcountVerified && navigate('/');
  },[isLoggedIn,userData])
  return (
    <div className='flex items-center justify-center min-h-screen  bg-gradient-to-b from-gray-100 to-gray-300'>

      <form onSubmit={onSubmitHandler} className='w-96 text-sm rounded-lg shadow-lg bg-slate-900 p-8'>
        <h1 className='text-2xl text-center text-white mb-2'>Otp validation</h1>
        <p className='text-center text-white mb-4'>Please enter the otp</p>
        <div className="flex justify-center mb-6" onPaste={handlePaste}>
          {
            inputArray.map((input, index) => {
              return (
                <input
                  type="text"
                  className="w-12 h-12 text-center text-white border border-gray-300 rounded-md mr-2"
                  key={index}
                  value={inputArray[index]}
                  ref={input => refArr.current[index] = input}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleOneKeyDown(e, index)}
                />
              );
            })
          }
        </div>
        <button className='w-full py-3 bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-full'>Verify Email</button>
      </form>

    </div>
  )
}

export default EmailVarification;
