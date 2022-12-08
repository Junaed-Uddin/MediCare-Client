import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationDialogue from '../../Shared/ConfirmationDialogue/ConfirmationDialogue';
import Loader from '../../Shared/Loader/Loader';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data.data;

            } catch (error) {
                console.log(error.message);
            }
        }
    });

    const successModal = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success(`${doctor.name} Successfully Deleted`)
        })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='ml-7'>
            <h2 className='text-start text-2xl font-semibold mb-5'>Total Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <td>{i + 1}</td>
                                <td><div className="avatar">
                                    <div className="w-20 mask mask-squircle">
                                        <img src={doctor.image} alt='' />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td><label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirm-modal" className="btn border-none px-3 py-2 bg-red-500 text-white rounded">Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {deletingDoctor && <ConfirmationDialogue
                title={`Are You Want to delete Doctor ${deletingDoctor.name} ?`}
                message={'If you delete this information, it cannot be undone'}
                closeModal={closeModal}
                successModal={successModal}
                successFullBtn={'Delete'}
                modalData={deletingDoctor}
            ></ConfirmationDialogue>}
        </div>
    );
};

export default ManageDoctors;