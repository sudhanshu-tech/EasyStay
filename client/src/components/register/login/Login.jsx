import React, { useState, useContext } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import theme from '../../../assets/theme.jpg';


const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);


    const onSubmitHandler = async (e) => {
        
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
                if (data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            }else{
                const { data } = await axios.post(backendUrl+'/api/auth/login', { email, password },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true   
                    },       
                );
                console.log(data);
                if (data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
     
      
    return (
        <div className='flex items-center justify-center h-screen' style={{ backgroundImage: `url(${theme})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>
                    {state === 'Sign Up' ? 'create Account' : 'Login'}
                </h2>
                <p className='text-center mb-5'>
                    {state === 'Sign Up' ? 'Create an account?' : 'Login to your account?'}
                </p>
                <form
                    onSubmit={onSubmitHandler}
                    className='flex flex-col items-start justify-center'>
                    {state === 'Sign Up' && (
                        <>
                            <label htmlFor="name" className='font-semibold text-start'>Full Name</label>
                            <input
                                type="text"
                                placeholder='Enter your Full Name '
                                name='name'
                                className='mb-4 border-2 w-full p-2 rounded-md'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </>
                    )}

                    <label htmlFor="email" className='font-semibold text-start'>Email</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        name='email'
                        className='mb-4 border-2 w-full p-2 rounded-md'
                        onChange={((e) => setEmail(e.target.value))}
                        value={email}
                    />
                    <label htmlFor="password" className='font-semibold text-start'>Password</label>
                    <input type="password"
                        placeholder='Enter your password'
                        name='password'
                        className='mb-4 mt-1 border-2 w-full p-2 rounded-md'
                        onChange={((e) => setPassword(e.target.value))}
                        value={password}
                    />
                    <p onClick={() => navigate('/resetPassword')}
                        className='text-right text-sm font-semibold cursor-pointer
                    
                    '>Forgot Password</p>
                    <button className='bg-blue-500 w-full py-2.5   rounded-md mt-5 hover:bg-red-500 hover:text-black cursor-pointer font-bold'>{state}</button>
                </form>
                <p className='mt-1 text-center'>{state === 'Sign Up' ? 'Already have an account?' : 'Dont have an account? '}&nbsp;&nbsp;
                    <span className='cursor-pointer underline ' onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}>{state === 'Sign Up' ? 'Login' : 'Sign Up'}</span>
                </p>
            </div>
        </div>
    )
}

export default Login
