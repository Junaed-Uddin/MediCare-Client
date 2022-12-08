import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthProvider } from '../../../Contexts/AuthContext';

const MyAppointment = () => {
    const { user } = useContext(AuthProvider);
    const { data: bookedUsers = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data.data;
        }
    })

    return (
        <div className='ml-7'>
            <h2 className='text-start text-2xl mb-7 font-semibold'>My Appointment</h2>
            <div className="overflow-x-auto mb-10">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient Name</th>
                            <th>Service Name</th>
                            <th>Date</th>
                            <th>Slot Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedUsers.map((bookUser, i) => <tr key={bookUser._id}>
                                <th>{i + 1}</th>
                                <th>{bookUser.personName}</th>
                                <td>{bookUser.treatmentName}</td>
                                <td>{bookUser.appointmentDate}</td>
                                <td>{bookUser.slot}</td>
                                <td>
                                    {
                                        bookUser.price && !bookUser.paid ? <Link to={`/dashboard/booking/${bookUser._id}`}><button className='btn px-3 text-white bg-blue-500 rounded border-none'>Pay</button></Link> : <span className='px-3 py-2 text-white bg-green-400 rounded border-none'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyAppointment;