import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../Contexts/AuthContext';
import useToken from '../../hooks/useToken';

const Register = () => {
    const [createUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();

    const { createRegister, updateUser, googleSignIn } = useContext(AuthProvider);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    if (token) {
        toast.success('Successfully Registered');
        navigate('/');
    }

    const handleRegister = (data) => {
        createRegister(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);

                const userInfo = {
                    displayName: data.name
                }

                updateUser(userInfo)
                    .then(() => {
                        savedUser(data.name, data.email);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })
        reset();
    }

    const savedUser = (name, email) => {
        const userInfo = { name, email };

        fetch('http://localhost:5000/users  ', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setCreatedUserEmail(email);
                }
                else {
                    toast.error(data.error);
                }
            })
    }


    const googleSignUp = () => {
        googleSignIn()
            .then(res => {
                const user = res.user;
                savedUser(user?.displayName, user?.email);
                console.log(user);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col items-center py-7 rounded-lg px-8 h-full w-full max-w-sm mx-auto shadow-2xl my-5 justify-center outline outline-slate-50'>
            <form onSubmit={handleSubmit(handleRegister)} className='w-full max-w-sm mx-auto'>
                <h2 className='text-2xl mb-3 font-semibold'>Register</h2>
                <div className="form-control w-full max-w-xs mx-auto">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Full Name" {...register("name",
                        {
                            required: 'Enter your Name',
                            maxLength: { value: 20, message: `Name cannot exceed 20 characters long` }
                        }
                    )} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500 text-start text-sm mt-2'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs mt-2 mx-auto">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" {...register("email",
                        {
                            required: 'Email field is required',
                        }
                    )} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500 text-start mt-2 text-sm'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs mx-auto mt-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="********" {...register("password",
                        {
                            required: 'Please Enter the password',
                            minLength: { value: 8, message: 'Password length min 8 characters long' },
                            pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password Contains uppercase, lowercase, number and special characters' }
                        }
                    )} className="input input-bordered w-full max-w-xs mt-1" />
                    {errors.password && <p className='text-red-500 text-start mt-2 text-sm'>{errors.password.message}</p>}
                </div>
                <input type="submit" className='btn border-none bg-gradient-to-r from-sky-500 to-indigo-500 text-white mt-4 w-full' value='Register' />
                <h2 className='text-start text-sm mt-2'>Already have an Account? <Link className='text-violet-500' to='/login'>Please Login</Link></h2>
                <div className="divider">OR</div>
            </form>
            <button onClick={googleSignUp} className='w-full py-2 outline flex items-center justify-center shadow-xl outline-none bg-white rounded'><FcGoogle className='mr-2' size={26}></FcGoogle><span> Sign in with Google</span></button>
        </div>
    );
};

export default Register;