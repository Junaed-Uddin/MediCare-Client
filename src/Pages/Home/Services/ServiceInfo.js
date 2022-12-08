import React from 'react';

const ServiceInfo = ({ service }) => {
    const { name, image, description } = service;
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-2xl pt-10">
                <figure><img className='h-28 object-cover' src={image} alt="Shoes" /></figure>
                <div className="card-body my-5">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className='text-gray-900'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceInfo;