
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../../assets/hotelImg.png';
import room from '../../assets/roomImg2.jpg';

const images = [
    img1,
    room,
    img1,       
    room,
    img1,
];
const AdvCard = () => {
    const [count, setCount] = useState(1);
    const slide = useRef();
    const tx = useRef(0); // persist tx

    console.log("tx", tx.current);    
    const handlenextbtn = () => {
        if (count < images.length - 1) {
            tx.current -= 50; // each card assumes 100% width
            slide.current.style.transform = `translateX(${tx.current}%)`;
            setCount(prev => prev + 1);
            console.warn("count",count);
        } else {
            tx.current = 0;
            slide.current.style.transform = `translateX(${tx.current}%)`;
            setCount(0);
        }
    };
    const handlebackbtn = () => {
        if (count > 0) {
            tx.current += 50;
            slide.current.style.transform = `translateX(${tx.current}%)`;
            setCount(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handlenextbtn();
        }, 3000);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="relative max-w-7xl mx-auto py-10 px-3 sm:px-6 lg:px-8 ">
            {/* Navigation Buttons */}
            <ChevronLeft className="absolute top-1/2 left-2 z-10 bg-white rounded-full p-1 shadow-md cursor-pointer" onClick={handlebackbtn} />
            <ChevronRight className="absolute top-1/2 right-2 z-10 bg-white rounded-full p-1 shadow-md cursor-pointer" onClick={handlenextbtn} />

            {/* Scrollable Container */}
            <div className='overflow-hidden w-full'>
                <div className="flex gap-4 md:gap-3 transform ease-in-out duration-500 " ref={slide} >
                    {images.map((img, key) => (
                        <div key={key} className="flex-shrink-0 bg-blue-900 text-white p-3 rounded-md shadow-lg  w-[100%] sm:w-[98%] md:w-[48.5%] lg:w-[49.5%] xl:w-[49%]" ref={slide}>
                            <div className="flex items-center gap-5">
                                <img src={img} alt="" className="w-[120px] h-[120px] rounded-2xl object-cover" />
                                <div>
                                    <p className="text-sm my-2">New, members-only reward for you</p>
                                    <h1 className="text-xl font-bold tracking-normal">Genius flight price Alert </h1>
                                    <p className="text-sm my-1">Save on flights with price alerts in your pocket. Set up an alert and get notified when prices drop.</p>
                                    <button className="bg-blue-500 px-4 py-2 rounded-md mt-2 hover:bg-red-500 hover:text-white transition">Get Genius</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <div key={idx}
                        className={`h-2 w-2 rounded-full ${idx === count ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvCard;

// import React, { useEffect, useRef, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import img1 from '../../assets/hotelImg.png';
// import room from '../../assets/roomImg2.jpg';

// const images = [img1, room, img1, room, img1, room];

// const AdvCard = () => {
//     const [count, setCount] = useState(0);
//     const slideRef = useRef(null);
//     const tx = useRef(0);

//     const handleNext = () => {
//         const max = images.length - 2; // 2 cards per slide
//         if (count < max) {
//             tx.current -= 50;
//             setCount(prev => prev + 1);
//         } else {
//             tx.current = 0;
//             setCount(0);
//         }
//         updateTransform();
//     };

//     const handlePrev = () => {
//         if (count > 0) {
//             tx.current += 50;
//             setCount(prev => prev - 1);
//         }
//         updateTransform();
//     };

//     const updateTransform = () => {
//         if (slideRef.current) {
//             slideRef.current.style.transform = `translateX(${tx.current}%)`;
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             handleNext();
//         }, 3000);
//         return () => clearInterval(interval);
//     }, [count]);

//     return (
//         <div className="relative max-w-7xl mx-auto py-10 px-3 sm:px-6 lg:px-8">
//             {/* Navigation Arrows */}
//             <ChevronLeft
//                 className="absolute top-1/2 left-2 z-10 bg-white rounded-full p-1 shadow-md cursor-pointer"
//                 onClick={handlePrev}
//             />
//             <ChevronRight
//                 className="absolute top-1/2 right-2 z-10 bg-white rounded-full p-1 shadow-md cursor-pointer"
//                 onClick={handleNext}
//             />

//             {/* Slider */}
//             <div className="overflow-hidden w-full">
//                 <div
//                     ref={slideRef}
//                     className="flex gap-4 transition-transform duration-500 ease-in-out"
//                     style={{ transform: `translateX(${tx.current}%)` }}
//                 >
//                     {images.map((img, index) => (
//                         <div
//                             key={index}
//                             className="flex-shrink-0 bg-blue-900 text-white p-3 rounded-md shadow-lg w-[100%] sm:w-[98%] md:w-[48.5%] lg:w-[49.5%] xl:w-[49%]"
//                         >
//                             <div className="flex items-center gap-5">
//                                 <img
//                                     src={img}
//                                     alt={`slide-${index}`}
//                                     className="w-[120px] h-[120px] rounded-2xl object-cover"
//                                 />
//                                 <div>
//                                     <p className="text-sm my-2">New, members-only reward for you</p>
//                                     <h1 className="text-xl font-bold tracking-normal">Genius flight price Alert</h1>
//                                     <p className="text-sm my-1">
//                                         Save on flights with price alerts in your pocket. Set up an alert and get notified when prices drop.
//                                     </p>
//                                     <button className="bg-blue-500 px-4 py-2 rounded-md mt-2 hover:bg-red-500 hover:text-white transition">
//                                         Get Genius
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Indicators */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//                 {images.map((_, idx) => (
//                     <div
//                         key={idx}
//                         className={`h-2 w-2 rounded-full ${idx === count ? 'bg-blue-600' : 'bg-gray-300'}`}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdvCard;

