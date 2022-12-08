import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthProvider } from '../../../Contexts/AuthContext';

const DisplayError = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const { logOut } = useContext(AuthProvider);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('successfully logout');
                navigate('/login');
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <p>Oops! Sorry, an unexpected error has occurred.</p>
            <div className=''>
                <p>{error.statusText || error.message}.</p>
            </div>
            <div className='ml-1'>
                <p className='text'> Please <button className='btn text-white ml-2' onClick={handleSignOut}>Logout</button></p>
            </div>
        </div>
    );
};

export default DisplayError;