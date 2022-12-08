import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';

const AddDoctor = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imageKey = process.env.REACT_APP_SECRET_Key;
    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['appointmentSpecialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data.data;
        }
    })

    const handleDoctor = data => {
        console.log(data);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageKey}`, {
            method: 'POST',
            body: formData
        })  
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const doctorInfo = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imageData.data.url
                    }

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctorInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success(data.message);
                            reset();
                            navigate('/dashboard/manageDoctors');
                        })
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit(handleDoctor)} className='w-full bg-white max-w-md mx-auto py-10 rounded-lg'>
                <h2 className='text-2xl mb-3 font-semibold'>Add a New Doctor</h2>
                <div className="form-control w-full max-w-sm mx-auto">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Full Name" {...register("name",
                        {
                            required: 'Enter your Name',
                            maxLength: { value: 20, message: `Name cannot exceed 20 characters long` }
                        }
                    )} className="input input-bordered w-full max-w-sm" />
                </div>
                <div className="form-control w-full max-w-sm mx-auto mt-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" {...register("email",
                        {
                            required: 'Email field is required',
                        }
                    )} className="input input-bordered w-full max-w-sm" />
                    {errors.email && <p className='text-red-500 text-start mt-2 text-sm'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-sm mt-2 mx-auto">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select className="select input-bordered" {...register("specialty")}>
                        {
                            specialties.map((specialty, i) => <option key={specialty._id}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-sm mx-auto mt-3">
                    <input type="file" placeholder="file" {...register("img")} className="input input-bordered w-full max-w-sm mt-1 py-2" />
                    {errors.img && <p className='text-red-500 text-start mt-2 text-sm'>{errors.img.message}</p>}
                </div>
                <div className='w-full max-w-sm mx-auto'>
                    <input type="submit" className='btn border-none bg-gradient-to-r from-sky-500 to-indigo-500 text-white mt-4 w-full' value='Add Doctor' />
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;