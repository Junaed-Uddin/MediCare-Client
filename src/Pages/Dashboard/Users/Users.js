import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Users = () => {
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://doctor-portal-server-topaz-ten.vercel.app/users');
            const data = await res.json();
            return data.data;
        }
    });


    const handleMakeAdmin = id => {
        fetch(`https://doctor-portal-server-topaz-ten.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message);
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <div className='ml-7 mb-10'>
            <h2 className='text-start text-2xl font-bold mb-5'>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='px-2 py-1 bg-amber-400 text-xs font-semibold'>Make Admin</button>}</td>
                                <td><button className='px-2 py-1 bg-red-500 text-white'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;