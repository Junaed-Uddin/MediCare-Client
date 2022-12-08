import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {

    const infos = [
        {
            id: 1,
            name: 'Opening Hours',
            description: '9.00am to 5.00pm',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-300'
        },
        {
            id: 2,
            name: 'Visit our Location',
            description: 'Brooklyn, NY 10036, United States',
            icon: marker,
            bgClass: 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: '+000 123 456789',
            icon: phone,
            bgClass: 'bg-gradient-to-l from-indigo-500 via-purple-500 to-violet-300'
        },
    ]

    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 mx-5 xl:mx-0 gap-5 my-5 lg:my-20 grid-cols-1'>
                {
                    infos.map(info => <InfoCard
                        key={info.id}
                        info={info}
                    ></InfoCard>)
                }
            </div>
        </div>
    );
};

export default InfoCards;