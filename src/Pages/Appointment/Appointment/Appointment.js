import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AppointmentSchedules from '../AppointmentSchedules/AppointmentSchedules';

const Appointment = () => {
    const [selectDate, setSelectDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectDate={selectDate}
                setSelectDate={setSelectDate}
            ></AppointmentBanner>
            <AppointmentSchedules
                selectDate={selectDate}
            ></AppointmentSchedules>
        </div>
    );
};

export default Appointment;