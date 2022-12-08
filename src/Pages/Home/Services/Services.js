import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import treatment from '../../../assets/images/treatment.png';
import ServiceInfo from './ServiceInfo';

const Services = () => {
    const serviceInfos = [

        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Fluoride works by strengthening tooth enamel, making it more resistant to decay.',
            image: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Cavity Fillings are also used to repair cracked or broken teeth and teeth that have been worn down from misuse',
            image: cavity
        },
        {
            id: 3,
            name: 'Fluoride Treatment',
            description: `Skin lightening used to improve the appearance of blemishes such as birthmarks and dark patches.`,
            image: whitening
        },
    ]

    return (
        <section>
            <div className='mt-10'>
                <h2 className='text-xl uppercase text-transparent font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-300 bg-clip-text'>Our Services</h2>
                <p className='text-4xl my-2 font-bold'>Services We Provide</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 mt-8 gap-5 mx-5 xl:mx-0 grid-cols-1'>
                {
                    serviceInfos.map(service => <ServiceInfo
                        key={service.id}
                        service={service}
                    ></ServiceInfo>)
                }
            </div>
            <section>
                <div className="hero my-8 lg:my-16">
                    <div className="hero-content h-full lg:w-4/5 mx-1 xl:mx-0 flex-col gap-10 lg:flex-row">
                        <img src={treatment} alt="" className="h-[420px] w-full lg:w-96 rounded-lg object-cover shadow-2xl" />
                        <div className='text-start w-11/12 lg:w-3/5'>
                            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">Exceptional Dental Care, on Your Terms</h1>
                            <p className="py-6">As part of our commitment to help make a difference to the health and care of our customers, we have taken a more active role to provide health and care services to help our customers achieve and maintain optimal health. We are a team of dentists, hygienists and receptionists who work together to ensure that you receive the best treatment that you require at a very time that suits you.</p>
                            <button className="px-4 py-2 bg-violet-500 rounded text-white">Get Started</button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Services;