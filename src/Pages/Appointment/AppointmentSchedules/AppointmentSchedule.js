import React from 'react';

const AppointmentSchedule = ({ schedule, setTreatment }) => {
    const { name, slots, price } = schedule;

    return (
        <div className="card shadow-2xl outline outline-1 outline-gray-50
         py-3">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-violet-500">{name}</h2>
                <p>{slots.length ? slots[0] : 'Try another day'}</p>
                <p>{slots.length ? slots.length : 0} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                <p>Price: ${price}</p>
                <div className="card-actions mt-2">
                    <label
                        onClick={() => setTreatment(schedule)} htmlFor="booking-modal" className="px-4 py-2 bg-violet-500 text-white rounded">Book Appointment
                    </label>
                </div>

            </div>
        </div>
    );
};

export default AppointmentSchedule;