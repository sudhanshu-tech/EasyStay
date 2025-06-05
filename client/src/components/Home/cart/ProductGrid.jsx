import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import hotel from '../../../assets/hotelImg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const products = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Hotel Room ${i + 1}`,
    price: (Math.random() * 100 + 10).toFixed(2),
    image: hotel,
}));

const ProductGrid = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 p-6 max-w-[1200px] mx-auto px-4 mt-[10%]">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Living Rooms and Suites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <div className='w-[80%] h-[20%]  rounded-md opacity-80 flex items-start justify-start mt-4'>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <p className='ml-4'>5/5</p>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <button
                                className="mt-4 flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-red-500 transition-colors"
                                onClick={()=>navigate('/checkAvailability')}
                            >     
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
