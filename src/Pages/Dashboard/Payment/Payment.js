import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const { appointmentDate, slot, treatmentName, price } = booking.data;

    return (
        <div className='my-5'>
            <h2 className='text-3xl font-semibold mb-5'>Payment for {treatmentName}</h2>
            <p className='text-lg'>Please pay $<strong>{price}</strong> for your appointment Date on {appointmentDate} at {slot}</p>

            <div className='w-5/12 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;