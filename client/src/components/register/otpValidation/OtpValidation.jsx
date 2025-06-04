import React,{useState,useRef, useEffect} from 'react'
import './OtpValidation.css'

const OTP_DIGITS_COUNT = 6;
const OtpValidation = () => {  
    
    const [inputArray, setInputArray] = useState(new Array(OTP_DIGITS_COUNT).fill(""));
    const refArr = useRef([]);

      useEffect(() => {
        refArr.current[0]?.focus();
    }, []);
    const handleChange = (value, index) => {
        if(isNaN(value)){
            return;
        }
        console.log(value);
        const newValue = value.trim();
        const newArr = [...inputArray];
        newArr[index] = newValue.slice(-1);
        setInputArray(newArr);

        newValue && refArr.current[index+1]?.focus();
    }

    const handleOneKeyDown=(e,index)=>{
        if( !e.target.value && e.key === "Backspace"){
            refArr.current[index - 1]?.focus();
        }
    }
  return (
    <div className='flex flex-col items-center  h-screen'>
      <h1 className='text-2xl text-center'>Otp validation</h1>
      <div>
        {
        inputArray.map((input, index) => {
          return (
            <input
              type="text"
              className="otp_input"
              key={index}
              value={inputArray[index]}
            ref={input => refArr.current[index] = input}
            onChange={(e)=>handleChange(e.target.value,index)}
            onKeyDown={(e)=>handleOneKeyDown(e,index)}
            />
          );
        })
      }
      </div>
      
    </div>
  )
}

export default OtpValidation
