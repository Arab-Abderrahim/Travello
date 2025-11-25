import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { getBookings, calculateTotal } from '../utils/bookings';

export default function Checkout() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const allBookings = getBookings();
        const confirmedBookings = allBookings.filter(b => b.confirmed);
        setBookings(confirmedBookings);

        // Calculate total for confirmed bookings only
        const confirmedTotal = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        setTotal(confirmedTotal);
    }, []);

    const handlePaymentChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setProcessing(false);
        setSuccess(true);

        // Redirect to bookings page after 3 seconds
        setTimeout(() => {
            navigate('/bookings');
        }, 3000);
    };

    if (bookings.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="card p-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">No Confirmed Bookings</h1>
                    <p className="text-gray-600 mb-8">
                        You need to confirm your bookings before proceeding to checkout.
                    </p>
                    <button onClick={() => navigate('/bookings')} className="btn-primary">
                        Go to My Bookings
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="card p-12">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Your payment of <span className="font-bold text-primary-600">${total}</span> has been processed.
                    </p>
                    <p className="text-gray-500 mb-8">
                        Confirmation emails have been sent to your registered email addresses.
                    </p>
                    <div className="inline-flex items-center text-sm text-gray-500">
                        <Lock className="h-4 w-4 mr-2" />
                        Redirecting to My Bookings...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking Summary */}
                <div className="lg:col-span-2">
                    <div className="card p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Summary</h2>
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="flex justify-between items-start pb-4 border-b border-gray-200">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <span className="text-sm uppercase text-gray-500 font-medium mr-2">
                                                {booking.itemType}
                                            </span>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                Confirmed
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900">{booking.title}</h3>
                                        <div className="text-sm text-gray-600 mt-1">
                                            <p>{new Date(booking.date).toLocaleDateString()}</p>
                                            <p>{booking.guests} {booking.itemType === 'flight' ? 'passengers' : booking.itemType === 'hotel' ? 'rooms' : 'guests'}</p>
                                            {booking.nights && <p>{booking.nights} night(s)</p>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary-600">${booking.totalPrice}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                        <div className="mb-6">
                            <label className="label">Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 border-2 rounded-lg flex items-center justify-center transition ${paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                                        }`}
                                >
                                    <CreditCard className="h-5 w-5 mr-2" />
                                    Credit Card
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`p-4 border-2 rounded-lg flex items-center justify-center transition ${paymentMethod === 'paypal' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                                        }`}
                                >
                                    💳 PayPal
                                </button>
                            </div>
                        </div>

                        {paymentMethod === 'card' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentDetails.cardNumber}
                                        onChange={handlePaymentChange}
                                        required
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="label">Cardholder Name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={paymentDetails.cardName}
                                        onChange={handlePaymentChange}
                                        required
                                        placeholder="John Doe"
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={paymentDetails.expiryDate}
                                            onChange={handlePaymentChange}
                                            required
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={paymentDetails.cvv}
                                            onChange={handlePaymentChange}
                                            required
                                            placeholder="123"
                                            maxLength="3"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 mt-4">
                                    <Lock className="h-4 w-4 mr-2" />
                                    <span>Your payment information is secure and encrypted</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Processing Payment...' : `Pay $${total}`}
                                </button>
                            </form>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="btn-primary text-lg py-4 px-8 disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : `Continue to PayPal - $${total}`}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-20">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({bookings.length} bookings)</span>
                                <span className="font-semibold">${total}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Service Fee</span>
                                <span className="font-semibold text-green-600">$0</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Taxes</span>
                                <span className="font-semibold">Included</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xl font-bold mb-6">
                            <span>Total</span>
                            <span className="text-3xl text-primary-600">${total}</span>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-green-900 mb-2">✓ What's Included</h3>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Free cancellation (24hrs)</li>
                                <li>• Instant confirmation</li>
                                <li>• Email & SMS updates</li>
                                <li>• 24/7 customer support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
