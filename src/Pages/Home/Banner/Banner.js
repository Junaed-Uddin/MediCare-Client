import React from 'react';
import { Link } from 'react-router-dom';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';

const Banner = () => {
    return (
        <header style={{ background: `url(${bg})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
            <div className="relative flex flex-col-reverse py-4 lg:py-16 lg:pt-0 lg:flex-col lg:pb-0">
                <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-3xl px-6 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 xl:w-8/12 lg:max-w-full lg:absolute xl:px-0">
                    <svg
                        className="absolute left-0 hidden h-full text-gray-100 transform -translate-x-1/2 lg:block"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        preserveAspectRatio="none slice"
                    >
                        <path d="M50 0H100L50 100H0L50 0Z" />
                    </svg>
                    <img
                        className="object-cover w-full h-80 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-[550px]"
                        src={chair}
                        alt=""
                    />
                </div>
                <div className="relative flex flex-col items-start w-full max-w-xl sm:max-w-3xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-2xl">
                    <div className="mb-5 md:mb-8 text-start lg:my-24 lg:max-w-lg lg:pr-5 mx-3 sm:mx-0">
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-300 uppercase rounded-full">
                            Medical
                        </p>
                        <h2 className="mb-7 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-1">
                            Medical Service
                            <br className="hidden md:block" />
                            You Can Trust{' '}
                        </h2>
                        <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                            The Medicare Health Center is a your go-to team of doctors for all your medical needs. Our specialized team will leave nothing to be desired.
                        </p>
                        <div className="flex items-center justify-start flex-wrap">
                            <Link
                                to='/'
                                className="inline-flex items-center justify-center h-12 px-6 mr-3 lg:mr-6 font-medium tracking-wide text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-300 rounded shadow-md"
                            >
                                Get started
                            </Link>
                            <Link
                                to="/"
                                aria-label=""
                                className="flex py-4 items-center font-semibold text-amber-500 sm:mt-0 transition-colors duration-200"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Banner;