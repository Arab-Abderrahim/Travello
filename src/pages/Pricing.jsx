import { useState } from 'react';
import { Check, Crown, Building2 } from 'lucide-react';
import { saveSelectedPlan, getSelectedPlan } from '../utils/bookings';

export default function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState(getSelectedPlan());
    const [showSuccess, setShowSuccess] = useState(false);

    const plans = [
        {
            name: 'Basic',
            price: '$0',
            period: 'Free forever',
            description: 'Perfect for occasional travelers',
            icon: Check,
            features: [
                'Up to 5 bookings per month',
                'Basic search functionality',
                'Email support',
                'Access to all destinations',
                'Mobile app access',
            ],
            recommended: false,
        },
        {
            name: 'Premium',
            price: '$29',
            period: 'per month',
            description: 'Best for frequent travelers',
            icon: Crown,
            features: [
                'Unlimited bookings',
                'Advanced search & filters',
                'Priority support 24/7',
                'Exclusive deals & discounts',
                'Price drop alerts',
                'Flexible cancellation',
                'Travel insurance options',
            ],
            recommended: true,
        },
        {
            name: 'Agency',
            price: '$149',
            period: 'per month',
            description: 'For travel agencies & businesses',
            icon: Building2,
            features: [
                'Everything in Premium',
                'Up to 10 team members',
                'Bulk booking management',
                'Analytics & reporting',
                'API access',
                'Dedicated account manager',
                'White-label options',
                'Commission tracking',
            ],
            recommended: false,
        },
    ];

    const handleSelectPlan = (planName) => {
        saveSelectedPlan(planName);
        setSelectedPlan(planName);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Select the perfect plan for your travel needs. Upgrade, downgrade, or cancel anytime.
                </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="max-w-md mx-auto mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center">
                    <Check className="h-5 w-5 mr-3" />
                    <span>Plan selected successfully!</span>
                </div>
            )}

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.name;

                    return (
                        <div
                            key={plan.name}
                            className={`relative card p-8 transition-all duration-300 ${plan.recommended
                                    ? 'ring-4 ring-primary-500 scale-105'
                                    : isSelected
                                        ? 'ring-2 ring-primary-300'
                                        : ''
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        Recommended
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 ${plan.recommended ? 'gradient-bg' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <Icon className={`h-8 w-8 ${plan.recommended ? 'text-white' : 'text-gray-600'}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <div className="mb-2">
                                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                </div>
                                <div className="text-gray-600">{plan.period}</div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan.name)}
                                className={`w-full py-3 rounded-lg font-semibold transition-all ${isSelected
                                        ? 'bg-green-600 text-white'
                                        : plan.recommended
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                    }`}
                            >
                                {isSelected ? 'Current Plan' : 'Select Plan'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-2">Can I change my plan later?</h3>
                        <p className="text-gray-600">
                            Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                        </p>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                        <p className="text-gray-600">
                            We accept all major credit cards, PayPal, and bank transfers for Agency plans.
                        </p>
                    </div>
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-2">Is there a contract commitment?</h3>
                        <p className="text-gray-600">
                            No, all plans are billed monthly with no long-term contracts. Cancel anytime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
