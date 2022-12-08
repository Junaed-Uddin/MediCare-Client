import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loader from '../../Shared/Loader/Loader';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentSchedule from './AppointmentSchedule';

const AppointmentSchedules = ({ selectDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectDate, "PP");

    const { data: schedules = [], refetch, isLoading } = useQuery({
        queryKey: ['appointments', date],
        queryFn: async () => {
            const res = await fetch(`https://doctor-portal-server-topaz-ten.vercel.app/appointments?date=${date}`);
            const data = await res.json();
            return data.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <div className='py-5'>
                <p className='text-violet-500 text-lg font-bold'>Available Appointments on {format(selectDate, 'PP')}</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:mx-5 mx-3 pl-2'>
                {
                    schedules.map(schedule => <AppointmentSchedule
                        key={schedule._id}
                        schedule={schedule}
                        setTreatment={setTreatment}
                    ></AppointmentSchedule>)
                }
            </div>
            {treatment && <BookingModal
                treatment={treatment}
                setTreatment={setTreatment}
                selectDate={selectDate}
                refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AppointmentSchedules;