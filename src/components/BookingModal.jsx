import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { saveBooking } from '../utils/bookings';

export default function BookingModal({ isOpen, onClose, item, itemType }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        guests: 1,
        nights: 1,
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [formData.guests, formData.nights, item]);

    const calculateTotal = () => {
        if (!item) return;

        let price = item.price;

        if (itemType === 'hotel') {
            // Price per night * number of nights * number of rooms (guests)
            price = item.price * formData.nights * formData.guests;
        } else if (itemType === 'flight') {
            // Price per passenger
            price = item.price * formData.guests;
        } else {
            // Price per person for trips and activities
            price = item.price * formData.guests;
        }

        setTotalPrice(price);
    };

    if (!isOpen || !item) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const booking = {
            itemType,
            title: item.name || item.title || `${item.origin} to ${item.destination}`,
            price: item.price,
            date: formData.date,
            extraDetails: {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                notes: formData.notes,
            },
            guests: parseInt(formData.guests),
            nights: itemType === 'hotel' ? parseInt(formData.nights) : undefined,
            totalPrice,
            image: item.image || null,
            itemData: item,
        };

        const saved = saveBooking(booking);

        if (saved) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    date: '',
                    guests: 1,
                    nights: 1,
                    notes: '',
                });
            }, 2000);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
                    onClick={onClose}
                ></div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">Complete Your Booking</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {success ? (
                            <div className="py-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
                                <p className="text-gray-600">Your booking has been saved successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="label">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="+213 555 123 456"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        {itemType === 'hotel' ? 'Check-in Date' : 'Date'}
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                {itemType === 'hotel' && (
                                    <div>
                                        <label className="label">Number of Nights</label>
                                        <input
                                            type="number"
                                            name="nights"
                                            value={formData.nights}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            max="30"
                                            className="input-field"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            ${item.price} per night
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="label">
                                        Number of {itemType === 'flight' ? 'Passengers' : itemType === 'hotel' ? 'Rooms' : 'Guests'}
                                    </label>
                                    <input
                                        type="number"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="20"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="label">Additional Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="3"
                                        className="input-field"
                                        placeholder="Any special requirements..."
                                    ></textarea>
                                </div>

                                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                                    <div className="space-y-2 text-sm text-gray-700 mb-3">
                                        {itemType === 'hotel' && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span>${item.price} x {formData.nights} night(s)</span>
                                                    <span>${item.price * formData.nights}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>x {formData.guests} room(s)</span>
                                                    <span></span>
                                                </div>
                                            </>
                                        )}
                                        {itemType !== 'hotel' && (
                                            <div className="flex justify-between">
                                                <span>${item.price} x {formData.guests} {itemType === 'flight' ? 'passenger(s)' : 'guest(s)'}</span>
                                                <span></span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-semibold border-t border-primary-300 pt-3">
                                        <span>Total Price:</span>
                                        <span className="text-2xl text-primary-600">${totalPrice}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
