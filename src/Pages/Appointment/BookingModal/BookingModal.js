import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthProvider } from '../../../Contexts/AuthContext';

const BookingModal = ({ selectDate, treatment, setTreatment, refetch }) => {
    const { user } = useContext(AuthProvider);
    const date = format(selectDate, "PP");
    const { name, slots, price } = treatment;

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const bookingAppointment = {
            personName: form.fullName.value,
            treatmentName: name,
            appointmentDate: form.date.value,
            phone: form.phone.value,
            email: form.email.value,
            slot: form.slot.value,
            price: price
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingAppointment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setTreatment(null);
                    toast.success(data.message);
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-start">{name}</h3>
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <input name='date' type="text" disabled placeholder="Type here" className="input input-bordered input-black w-full my-2" value={date} />

                        <select name='slot' className="select select-bordered w-full my-2">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>

                        <input name='fullName' disabled defaultValue={user?.displayName} type="text" placeholder="Full Name" className="input input-bordered input-black w-full my-2" />

                        <input name='email' disabled defaultValue={user?.email} type="email" placeholder="Email" className="input input-bordered input-black w-full my-2" />

                        <input name='phone' type="text" placeholder="Phone" className="input input-bordered input-black w-full my-2" />

                        <input type="submit" className="btn hover:bg-violet-500 border-none bg-violet-500 text-white rounded w-full my-2" value='Submit' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;