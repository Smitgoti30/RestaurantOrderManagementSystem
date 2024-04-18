import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
    const navigate = useNavigate();
    const handleBackToHome = () => {
        sessionStorage.clear();
        navigate('/');
    };
  return (
    <div className='success text-center'>
        <h2>Payment Successfully Completed</h2>
        <div className='text-center'>
            <button className='btn btn-red my-3' onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    </div>
    )
}
