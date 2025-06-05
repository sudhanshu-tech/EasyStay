import React, { useState } from "react";
import img1 from '../../assets/hotelImg.png';
import img2 from '../../assets/landingImg.jpg'
import { FaLocationDot } from 'react-icons/fa6';
import { FaParking, FaFireExtinguisher, FaUtensils, FaBroom, FaUsers, FaMoon, FaDoorOpen } from 'react-icons/fa';

import { Dialog } from "@headlessui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [img1, img2, img1, img2, img1, img2, img1, img2, img1, img2, img1, img2,]; // Placeholder for multiple images

const CheckAvailability = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showBidModal, setShowBidModal] = useState(false);

    const originalPrice = 3412;
    const initialBid = 1987;

    const [bidAmount, setBidAmount] = useState(initialBid);
    const [discount, setDiscount] = useState(
        (((originalPrice - initialBid) / originalPrice) * 100).toFixed(2)
    );

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setBidAmount(value);
        const newDiscount = (((originalPrice - value) / originalPrice) * 100).toFixed(2);
        setDiscount(newDiscount);
    };

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const openBidModal = () => setShowBidModal(true);
    const closeBidModal = () => setShowBidModal(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const sideThumbnails = images.slice(1, 4); // Only show 3 thumbnails


    return (
        <div className='bg-gradient-to-r from-purple-800 to-purple-600 '>
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                <div className="my-2">
                    <h1 className="text-2xl font-bold text-white py-2">Check Availability</h1>
                    <p className="text-gray-300 flex gap-2 items-center">
                        <FaLocationDot />
                        Find the best deals for your stay
                    </p>
                </div>

                <div className="w-full bg-gray-100 rounded-lg shadow-lg p-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left: Images */}
                        <div className="w-full lg:w-[55%] bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <img
                                        src={images[0]}
                                        alt="Main"
                                        className="rounded-lg w-full h-96 object-cover cursor-pointer"
                                        onClick={() => openModal(0)}
                                    />
                                </div>
                                <div className="flex md:flex-col gap-2 overflow-x-hidden md:overflow-y-hidden max-h-96">
                                    {sideThumbnails.map((img, idx) => (
                                        <img
                                            key={idx + 1}
                                            src={img}
                                            alt={`Thumb ${idx + 1}`}
                                            className="w-28 h-20 md:w-32 md:h-24 rounded cursor-pointer object-cover hover:scale-105 transition"
                                            onClick={() => openModal(idx + 1)}
                                        />
                                    ))}
                                    <div
                                        className="w-28 h-20 md:w-32 md:h-24 flex items-center justify-center bg-gray-200 text-sm font-medium rounded cursor-pointer hover:bg-gray-300"
                                        onClick={() => openModal(0)}
                                    >
                                        View All
                                    </div>
                                </div>


                                <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                                        <Dialog.Panel className="relative max-w-4xl w-full p-4">
                                            <img
                                                src={images[currentIndex]}
                                                alt={`Slide ${currentIndex}`}
                                                className="w-full max-h-[80vh] object-contain rounded"
                                            />
                                            <button
                                                onClick={closeModal}
                                                className="absolute top-4 right-4 text-white text-2xl"
                                            >
                                                <X />
                                            </button>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                                            >
                                                <ChevronLeft />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                                            >
                                                <ChevronRight />
                                            </button>
                                        </Dialog.Panel>
                                    </div>
                                </Dialog>
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="w-full lg:w-[45%] bg-white shadow-lg rounded-xl p-4 space-y-4">
                            {/* Step Guide */}
                            <div className="bg-purple-100 p-4 rounded-lg text-center">
                                <h2 className="font-semibold text-lg mb-2">Here's What You Can Do..</h2>
                                <div className="flex justify-around text-purple-900 font-semibold">
                                    {['Search', 'Bid', 'Book'].map((step, i) => (
                                        <div key={step} className="text-center">
                                            <div className="text-2xl">{i + 1}.</div>
                                            <div className="text-sm">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guests Info */}
                            <div className="flex justify-between text-sm text-purple-900 font-medium flex-wrap gap-2">
                                <div className="flex items-center gap-1">
                                    <FaUsers /> 2 Guests
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaMoon /> 1 Night
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaDoorOpen /> 1 Room
                                </div>
                            </div>

                            {/* Room Info */}
                            <div>
                                <h3 className="text-purple-800 font-bold text-lg">Deluxe Room</h3>
                                <a href="#" className="text-purple-800 underline text-sm">More options</a>
                            </div>

                            {/* Price Info */}
                            <div className="flex justify-between items-start text-sm flex-wrap gap-4">
                                <div>
                                    <div className="line-through text-gray-500">₹3412</div>
                                    <div className="text-2xl text-purple-900 font-bold">
                                        ₹2160 <span className="text-green-600 text-base font-normal">30.59% off</span>
                                    </div>
                                    <div className="text-gray-600">+ ₹259 Taxes & Fees</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-600">Start Bid @ ₹1987</div>
                                    <a href="#" className="text-purple-800 font-bold underline">BID NOW</a>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-purple-800 text-white py-2 rounded-md font-semibold" onClick={openBidModal}>Bid Now</button>
                                <button className="flex-1 border border-purple-800 text-purple-800 py-2 rounded-md font-semibold">Book Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Bid Modal */}
                    {showBidModal && (
                        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg w-[480px] shadow-lg p-6 relative">
                                <h2 className="text-xl font-bold text-blue-900 mb-4">Make Your Bid Here!</h2>

                                <div className="bg-purple-50 p-4 rounded mb-4">
                                    <p className="font-semibold">You’re Bidding For</p>
                                    <ul className="list-disc list-inside text-sm mt-2 text-gray-700">
                                        <li>Hotel soho lite, Noida</li>
                                        <li>5 June 2025 - 6 June 2025</li>
                                        <li>CLASSIC ROOM</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-200 text-center text-sm py-2 mb-4 rounded text-gray-700">
                                    You won’t pay anything until you accept the deal!
                                </div>

                                <div className="flex flex-col items-center mb-4">
                                    <div className="flex items-center space-x-4 mb-3">
                                        <span className="line-through text-gray-500 text-xl">₹{originalPrice}</span>
                                        <div className="bg-white border rounded px-4 py-2 shadow text-2xl font-semibold">₹{bidAmount}</div>
                                        <span className="text-green-600 font-semibold text-lg">{discount}% OFF</span>
                                    </div>

                                    <input
                                        type="range"
                                        min={Math.floor(originalPrice * 0.8)}
                                        max={originalPrice}
                                        value={bidAmount}
                                        onChange={handleSliderChange}
                                        className="w-full accent-green-600"
                                    />
                                    <p className="text-green-600 mt-2 font-medium">Very good offer - let the hotel decide.</p>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button onClick={closeBidModal} className="px-6 py-2 border border-blue-900 text-blue-900 font-semibold rounded">Close</button>
                                    <button onClick={() => alert(`Bid placed: ₹${bidAmount}`)} className="bg-blue-900 text-white font-semibold px-6 py-2 rounded shadow">Place Bid</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-7xl mx-auto p-4 space-y-6">

                        {/* Tabs */}
                        <div className="flex space-x-6 bg-purple-100 rounded-t-xl px-4 pt-3">
                            {['OverView', 'Rooms', 'Map', 'Policy', 'Review'].map((tab, idx) => (
                                <button
                                    key={tab}
                                    className={`pb-2 border-b-2 ${idx === 0 ? 'border-purple-800 text-purple-900 font-semibold' : 'border-transparent text-gray-700 hover:text-purple-700'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Content Box */}
                        <div className="bg-white rounded-xl shadow border p-4 md:flex md:justify-between md:items-start gap-6">

                            {/* Left: Overview Text */}
                            <div className="flex-1">
                                <p className="text-gray-800">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus praesentium, accusamus nam eos, possimus ullam dolores fuga debitis commodi, eius porro vel blanditiis? Nihil quos quae sed eveniet dignissimos temporibus?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur obcaecati iure rerum ad voluptatem aut molestiae culpa fugit distinctio repellendus consectetur quo, hic quos odio quis expedita perferendis voluptate placeat.
                                    <span className="text-purple-800 font-semibold cursor-pointer ml-1">Read More</span>
                                </p>
                            </div>

                            {/* Right: Rating Box */}
                            <div className="mt-4 md:mt-0 md:w-52 flex flex-col items-end">
                                <div className="bg-purple-800 text-white text-sm font-semibold px-3 py-1 rounded">3.0/5</div>
                                <div className="text-gray-800 font-semibold text-lg">Good</div>
                                <div className="text-sm text-gray-600">1 User Review</div>
                                <a href="#" className="text-sm text-purple-800 font-medium underline mt-2">All Reviews</a>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="bg-white rounded-xl shadow border p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
                            <div className="flex flex-wrap gap-6 text-gray-800 text-sm items-center">
                                <div className="flex items-center gap-2">
                                    <FaUsers className="text-lg" /> Reception Area
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaParking className="text-lg" /> Parking
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaFireExtinguisher className="text-lg" /> Fire and Safety
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBroom className="text-lg" /> Housekeeping
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUtensils className="text-lg" /> Restaurant
                                </div>
                                <a href="#" className="ml-auto text-purple-800 underline text-sm font-medium">View More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white rounded-2xl mt-2.5">
                    {/* Left: Contact Info */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Canada Head Office</h2>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Address:</h3>
                            <p className="text-gray-700 mt-1">
                                75 Tower Court Kernersville, NC 27284 PO Box <br />
                                6658 Rockhild SDT 2505
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Phone:</h3>
                            <p className="text-gray-700 mt-1">+1 (238) 456 7894</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Email:</h3>
                            <p className="text-gray-700 mt-1">contact@example.com</p>
                            <p className="text-gray-700">support@example.com</p>
                        </div>

                        <button className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded hover:bg-yellow-500 transition">
                            GET APPOINTMENT
                        </button>
                    </div>

                    {/* Right: Google Map Embed */}
                    <div className="w-full h-[400px]">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.512252003555!2d-79.38393448450103!3d43.653226179121316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d6f35bcd35%3A0x1e1d8e7c8ea55a3!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1629474022912!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded shadow-lg"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CheckAvailability;

