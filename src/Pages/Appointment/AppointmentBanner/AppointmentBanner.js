import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectDate, setSelectDate }) => {

    return (
        <section className="lg:my-10 px-4"
            style={{ background: `url(${bg})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-content flex justify-around flex-col lg:mx-5 w-full items-center lg:flex-row-reverse px-0">
                <img src={chair} alt='dental chair' className="rounded-lg shadow-2xl object-cover w-full h-96 lg:w-1/2 lg:h-[400px]" />
                <div className=''>
                    <DayPicker
                        mode='single'
                        selected={selectDate}
                        onSelect={setSelectDate}
                    />
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;