import React, { useContext, useEffect, useState } from 'react';
import './Hero.css'
import hotel from '../../assets/hotelImg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';

import { AppContext } from '../context/AppContext';
import About from '../About/About';
import ProductGrid from './cart/ProductGrid';
import Footer from '../Footer/Footer';
import CardSlider from '../CardSlider/CardSlider';
import AdvCard from '../cardSlider/AdvCard';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const currentYear = dayjs();

const Hero = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [cache, setCache] = useState({});
  const [Adult, setAdult] = useState(0);
  const [Children, setChildren] = useState(0);
  const [Room, setRoom] = useState(0);
  const [guest, setGuest] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const { userData } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (cache[input]) {
      setData(cache[input]);
      return;
    }
    const result = await fetch('https://dummyjson.com/products/search?q=' + input);
    const json = await result.json();
    setData(json?.products);

    setCache((prev) => {
      return {
        ...prev,
        [input]: json?.products
      }
    })
  }
  useEffect(() => {
    setTimeout(fetchData, 300);

    return (() => {
      clearTimeout(fetchData);
    })
  }, [input]);
  const handleInput = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className='Hero '>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  absolute top-[20%] left-[5%] right-0 bottom-0 lg:top-[40%] lg:left-[10%] lg:right-[10%] transition-all duration-500 ease-in-out '>
        <h1 className='text-4xl font-bold  z-50  max-w-[1200] max-auto text-white capitalize'>hey</h1>
        <span className='inline-block'>
          <h1 className='text-6xl text-white font-bold capitalize'>{userData ? userData.name : "Dear Guest"} </h1>
          <h1 className='text-end text-white capitalize'>Welcome to Easy Stay</h1>
        </span>

      </div>
      <div className='main_hero max-w-[1200px] mx-auto px-4'>
        <div className='checkBox top-[43%] lg:top-[75%]'>
          <div className='mainSearchDiv'>
            <div className="searchDiv">
              <FontAwesomeIcon icon={faLocationDot} className="text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Search for hotels, rooms, etc."
                className="text-md font-semibold outline-none w-[213px]  placeholder:text-white"

                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={() => setShowData(true)}
                onBlur={() => setShowData(false)}
                onFocus={() => setShowData(true)}
              />
            </div>
            <div className='searchBox' onChange={handleInput}>
              {showData &&
                data.map((r) => (
                  <span
                    className='searchItem'
                    key={r.id}
                    onMouseDown={() => setInput(r.title)}
                  >{r.title}</span>
                ))
              }
            </div>
          </div>
          <div className='flex items-center justify-center checkdiv'>
            <LocalizationProvider dateAdapter={AdapterDayjs} className='checkIn1'>
              <DatePicker
               label="Check In"
                className='w-[200px]  outline-none checkIn placeholder:text-white'
              />
            </LocalizationProvider>
          </div>
          <div className='flex items-center justify-center checkdiv'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check Out"
                className='w-[200px] checkout'
              />
            </LocalizationProvider>
          </div>
          <div className='relative data_box'>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={`${Adult}-Adult/ ${Children}-Children/ ${Room} Room`}
              className=' outline-none text-sm w-full px-3 inputDataBox'

            />
            <div className=' guest absolute '>
              <div className=''>
                <div className='guest_number flex justify-between items-center'>
                  <div className='adult_number font-bold'>Adult</div>
                  <div className='number'>
                    <div><FontAwesomeIcon icon={faMinus} onClick={() => setAdult(prevCount => (prevCount > 0 ? prevCount - 1 : 0))} /></div>
                    <h1>{Adult}</h1>
                    <div><FontAwesomeIcon icon={faPlus} onClick={() => setAdult(Adult + 1)} /></div>
                  </div>
                </div>
                <div className='children_number flex justify-between items-center'>
                  <div className='children_number font-bold'>Children</div>
                  <div className='number'>
                    <div><FontAwesomeIcon icon={faMinus} onClick={() => setChildren((prevChildren) => (prevChildren > 0 ? prevChildren - 1 : 0))} /></div>
                    <h1>{Children}</h1>
                    <div><FontAwesomeIcon icon={faPlus} onClick={() => setChildren(Children + 1)} /></div>
                  </div>
                </div>
                <div className='room_number flex justify-between items-center'>
                  <div className='room_number font-bold'>Room</div>
                  <div className='number'>
                    <div><FontAwesomeIcon icon={faMinus} onClick={() => setRoom((prevRoom) => (prevRoom > 0 ? prevRoom - 1 : 0))} /></div>
                    <h1>{Room}</h1>
                    <div><FontAwesomeIcon icon={faPlus} onClick={() => setRoom(Room + 1)} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='btn' onClick={()=>navigate('/properties')}>Check Now</div>
        </div>
      </div>
      {/* <About/>  */}   
      <ProductGrid/>
        <AdvCard/>
      <CardSlider/>
       <Footer/>

    </div>

  );
};

export default Hero;

