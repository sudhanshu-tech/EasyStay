import React, { useState } from 'react';
import img1 from '../../assets/landingImg.jpg';
import img2 from '../../assets/hotelImg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const minDistance = 1000;

const Properties = () => {
  // Separate state for each card (assume 5 items initially)
  const navigate = useNavigate();
  const [sliderValues, setSliderValues] = useState(
     Array(5).fill([4000, 5000])
  );

  const handleChange = (index) => (event, newValue, activeThumb) => {
    setSliderValues((prev) => {
      const updated = [...prev];
      const current = prev[index];

      console.warn('Current:', index);

      if (!Array.isArray(newValue)) return prev;

      if (activeThumb === 0) {
        updated[index] = [
          Math.min(newValue[0], current[1] - minDistance),
          current[1],
        ];
      } else {
        updated[index] = [
          current[0],
          Math.max(newValue[1], current[0] + minDistance),
        ];
      }

      return updated;
    });
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col lg:flex-row items-center lg:items-start p-4 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Sidebar */}
      <div className="w-full lg:w-[20%] h-[300px] lg:h-[80vh] bg-white rounded-lg shadow-lg p-4">
        {/* Sidebar content (if any) */}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[70%] bg-white rounded-lg shadow-lg p-4 space-y-4">
        {/* Top Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Sudhanshu', 'Sudhanshu', 'Sudhanshu', 'Sudhanshu'].map((label, i) => (
            <button
              key={i}
              className="border border-blue-900 p-2 hover:bg-blue-900 hover:text-white transition"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        {sliderValues.map((value, index) => (
          <div
            key={index}
            className="w-full border border-blue-900 p-4 rounded-sm flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0"
          >
            {/* Image */}
            <div className="w-full md:w-[30%] relative ">
             <div>
                <img
                src={img1}
                alt="Hotel"
                className="w-full h-full object-cover rounded-sm"
              />
             </div>
              <div className='w-[50px] left-[85px] top-[15px] border-4 border-amber-600 flex items-center justify-center relative'>
               <div className='absolute flex justify-center items-center gap-[3px]'>
                 <img
                  src={img2}
                  alt="Hotel"
                  className="w-20% h-20% object-cover rounded-sm"
                />
                <img
                  src={img1}
                  alt="Hotel"
                  className="w-full h-full object-cover rounded-sm"
                />
                <img
                  src={img1}
                  alt="Hotel"
                  className="w-full h-full object-cover rounded-sm"
                />
                <img
                  src={img1}
                  alt="Hotel"
                  className="w-full h-full object-cover rounded-sm"
                />
                <img
                  src={img1}
                  alt="Hotel"
                  className="w-full h-full object-cover rounded-sm"
                />
               </div>
              </div>
            </div>



            {/* Content */}
            <div className="w-full md:w-[70%] p-2 space-y-2">
              {/* Header */}
              <div className="flex justify-between md:flex-row space-y-2 md:space-y-0">
                <div>
                  <h1 className="text-xl font-bold text-blue-900">
                    Hotel Name
                  </h1>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={i}
                        className="text-yellow-500"
                      />
                    ))}
                  </div>
                  <div className="mt-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-gray-600 mr-1"
                    />
                    <span className="text-gray-600 text-sm">
                      New Friends Colony, New Delhi
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-lg text-lg font-semibold mb-[30px]">
                    4.2
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                magnam debitis reiciendis autem ut corporis praesentium sequi
                vel neque nihil vitae nulla, inventore accusamus qui odit totam
                voluptate assumenda id.
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center flex-col md:flex-row space-y-2 md:space-y-0">
                <div className="w-full md:w-[70%] h-10 pt-1.5 backdrop-blur-2xl bg-transparent flex justify-between items-center px-5 mt-3 rounded-2xl border">
                  <Box sx={{ width: '100%' }}>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={value}
                      onChange={handleChange(index)}
                      valueLabelDisplay="auto"
                      disableSwap
                      min={1000}
                      max={10000}
                    />
                  </Box>
                </div>
                <div className="text-center sm:p-2.5">
                  <h1 className="text-blue-900 font-bold text-lg text-center">
                    ₹{value[0]} - ₹{value[1]}
                  </h1>
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm mt-1" onClick={() => navigate('/checkAvailability')}>
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;


