import axios from 'axios';
import React,{ useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[userData, setUserData] = useState(false);

    const getAuthState =async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/isAuthenticated',{
                withCredentials: true,
            });          
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getUserData =async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data',{
                withCredentials: true,
            });    
            // console.warn(data);
            console.warn(data);
            data.success?setUserData(data.data):toast.error(data.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {getAuthState()}, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}