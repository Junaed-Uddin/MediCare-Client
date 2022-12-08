import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthProvider } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [loginCreateUser, setLoginCreateUser] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [token] = useToken(loginCreateUser);
    const from = location.state?.from?.pathname || '/';

    const { loginUser, googleSignIn } = useContext(AuthProvider);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        loginUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                toast.success('successfully Login');
                setLoginCreateUser(data.email);
            })
            .catch(err => console.log(err));
        reset();
    }

    const savedUser = (name, email) => {
        const userInfo = { name, email };

        fetch('https://doctor-portal-server-topaz-ten.vercel.app/users', {
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
                    setLoginCreateUser(email);
                }
                else {
                    toast.error(data.error);
                }
            })
    }

    const googleLogin = () => {
        googleSignIn()
            .then(res => {
                const user = res.user;
                console.log(user.email);
                if (user?.uid) {
                    toast.success('Successfully Login');
                    savedUser(user?.displayName, user?.email);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col items-center py-7 rounded-lg px-8 h-full w-full max-w-sm mx-auto shadow-2xl my-10 justify-center outline outline-slate-50'>
            <form onSubmit={handleSubmit(handleLogin)} className='w-full max-w-sm mx-auto' >
                <h2 className='text-2xl mb-3 font-semibold'>Login</h2>
                <div className="form-control w-full max-w-sm mt-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email", { required: 'Email is Required' })} type="email" placeholder="Email" className="input input-bordered w-full" />
                    {errors.email && <p className='text-red-500 text-start mt-2 text-sm'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-sm mt-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register("password", {
                        required: 'Please Enter the Password',
                    })} type="password" placeholder="*********" className="input input-bordered w-full" />
                    {errors.password && <p className='text-red-500 text-start mt-2 text-sm'>{errors.password?.message}</p>}
                </div>
                <input className='btn border-none bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 w-full max-w-xs text-white' type="submit" value='Login' />
                <p className='text-start text-sm mt-2'>New to MediCare? <Link className='text-violet-500' to='/register'>Create new Account</Link> </p>
                <div className="divider">OR</div>
            </form>
            <button onClick={googleLogin} className='w-full py-2 outline flex items-center justify-center outline-none shadow-xl bg-white rounded'><FcGoogle className='mr-2' size={26}></FcGoogle><span> Sign in with Google</span></button>
        </div>
    );
};

export default Login;