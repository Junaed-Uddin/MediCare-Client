import React from 'react';

const ConfirmationDialogue = ({ title, message, closeModal, successModal, modalData, successFullBtn }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-start">{title}</h3>
                    <p className="py-4 text-start">{message}</p>
                    <div className="modal-action">
                        <button onClick={closeModal} className="btn px-3 text-white bg-red-500 rounded border-none">Cancel</button>
                        <label onClick={() => successModal(modalData)} htmlFor="confirm-modal" className="btn px-3 text-white bg-blue-500 rounded border-none">{successFullBtn}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialogue;