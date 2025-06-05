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
  const navigate = useNavigate();

  // 8 cards with initial slider values
  const [sliderValues, setSliderValues] = useState(
    Array(8).fill([4000, 5000])
  );

  // Track main displayed image per card, default to img1
  const [selectedImages, setSelectedImages] = useState(
    Array(8).fill(img1)
  );
  // for hovering on thumbnail
  const [hoveredImages, setHoveredImages] = useState(Array(8).fill(null));

  // Handle slider range changes per card
  const handleChange = (index) => (event, newValue, activeThumb) => {
    setSliderValues((prev) => {
      const updated = [...prev];
      const current = prev[index];

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

  // Change main image on hover of thumbnail
  const handleImageHover = (cardIndex, image) => {
    setSelectedImages((prev) => {
      const updated = [...prev];
      updated[cardIndex] = image;
      return updated;
    });
  };

  // Example thumbnails for each card (can customize per card if needed)
  const thumbnails = [img1, img2, img1, img2, img1];

  return (
    <div className="w-full min-h-screen bg-black flex flex-col lg:flex-row items-center lg:items-start p-4 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Sidebar */}
      <div className="w-full lg:w-[20%] h-[300px] lg:h-[80vh] bg-white rounded-lg shadow-lg p-4">
        {/* You can add sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[70%] bg-white rounded-lg shadow-lg p-4 space-y-6">
        {/* Top Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
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
            {/* Image Section */}
            <div className="w-full md:w-[30%] relative space-y-2">
              {/* Main Image with zoom on hover */}
              <div className="overflow-hidden rounded-sm">
                <img      
                  src={hoveredImages[index] || selectedImages[index] || img1}   //updated
                  alt={`Hotel Main ${index}`}
                  className="w-full h-[200px] object-cover rounded-sm transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              {/* update image on hovering and clicking */}
              <div className="flex gap-1 overflow-x-auto">
                {thumbnails.map((thumb, i) => (
                  <img
                    key={i}
                    src={thumb}
                    alt={`thumb-${i}`}
                    onMouseEnter={() => {
                      const updated = [...hoveredImages];
                      updated[index] = thumb;
                      setHoveredImages(updated);
                    }}
                    onMouseLeave={() => {
                      const updated = [...hoveredImages];
                      updated[index] = null;
                      setHoveredImages(updated);
                    }}
                    onClick={() => {
                      const updated = [...selectedImages];
                      updated[index] = thumb;
                      setSelectedImages(updated);
                    }}
                    className={`w-[50px] h-[50px] object-cover rounded-md border-2 transition duration-300 cursor-pointer ${selectedImages[index] === thumb
                        ? 'border-blue-700 brightness-100'
                        : 'border-gray-300 brightness-75 hover:brightness-100 hover:border-blue-500'
                      }`}
                  />
                ))}

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-[70%] p-2 space-y-2">
              {/* Header */}
              <div className="flex justify-between md:flex-row space-y-2 md:space-y-0">
                <div>
                  <h1 className="text-xl font-bold text-blue-900">Hotel Name</h1>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={i}
                        className="text-yellow-500"
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex items-center text-gray-600 text-sm">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                    <span>New Friends Colony, New Delhi</span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-lg text-lg font-semibold mb-[30px]">
                    4.2
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                magnam debitis reiciendis autem ut corporis praesentium sequi
                vel neque nihil vitae nulla, inventore accusamus qui odit totam
                voluptate assumenda id.
              </p>

              {/* Footer */}
              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <div className="w-full md:w-[70%] h-10 pt-1.5 backdrop-blur-2xl bg-transparent flex justify-between items-center px-5 mt-3 rounded-2xl border border-gray-300">
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
                  <button
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm mt-1"
                    onClick={() => navigate('/checkAvailability')}
                  >
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
