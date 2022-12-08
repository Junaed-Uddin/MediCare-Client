import React from 'react';

const InfoCard = ({ info }) => {
    const { name, icon, description, bgClass } = info;
    return (
        <div className={`flex flex-col sm:flex-row text-white sm:justify-start items-center py-10 px-5 rounded-lg gap-5 shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="flex flex-col justify-center items-center">
                <h2 className="card-title">{name}</h2>
                <p className='pt-1'>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;