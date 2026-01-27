"use client";
import Image from 'next/image';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState, useEffect } from "react";
import EastIcon from '@mui/icons-material/East';
import Cookies from 'js-cookie';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';

export default function SubscriptionPlans({ user }) {
    let isProUser = user.subscription_plan.plan_status;
    const token = Cookies.get("token");
    // const [activePlanEnable, setActivePlanEnable] = useState(true);
    const [autoRenew, setAutoRenew] = useState(true);
    const [showPlansModal, setShowPlansModal] = useState(false);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [processingPayment, setProcessingPayment] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [paymentHistoryLoading, setPaymentHistoryLoading] = useState(false);
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);
    const [cards, setCards] = useState([]);
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [savingCard, setSavingCard] = useState(false)
    const [makingDefault, setMakingDefault] = useState(null)
    const [removingCard, setRemovingCard] = useState(null)

    useEffect(() => {
        if (user?.subscription_plan) {
            setAutoRenew(user.subscription_plan.auto_renew == 1);
        }
    }, [user]);


    console.log('usersss', plans)
    const fetchCards = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-method/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        if (data.success) setCards(data.cards)
    }

    useEffect(() => {
        if (isProUser) fetchCards()
    }, [isProUser])

    const fetchPaymentHistory = async () => {
        setPaymentHistoryLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/CoachpaymentHistory`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch payment history');
            }

            const data = await response.json();
            if (data.success && data.payments) {
                setPaymentHistory(data.payments);
                if (data.payments.length > 0) {
                    setCurrentPaymentMethod(data.payments[0]);
                }
            }
        } catch (err) {
            console.error('Error fetching payment history:', err);
        } finally {
            setPaymentHistoryLoading(false);
        }
    };

    const fetchPlans = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCoachSubcriptionPlan`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch plans');
            }

            const data = await response.json();
            if (data.plans && Array.isArray(data.plans)) {
                setPlans(data.plans);
            }
        } catch (err) {
            setError('Failed to load subscription plans');
            console.error('Error fetching plans:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlan = async (planId, planName) => {
        setProcessingPayment(planId);
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/PayCoachSubcriptionPlan`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan_id: planId
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to process payment');
            }

            if (data.success && data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                throw new Error('Invalid response from payment server');
            }

        } catch (err) {
            setError(err.message || 'Failed to process payment. Please try again.');
            console.error('Payment error:', err);
        } finally {
            setProcessingPayment(null);
        }
    };

    const handleOpenPlansModal = () => {
        setShowPlansModal(true);
        fetchPlans();
    };

    const handleCloseModal = () => {
        setShowPlansModal(false);
        setError('');
        setProcessingPayment(null);
    };

    const formatPrice = (plan) => {
        const amount = parseFloat(plan.plan_amount);
        const duration = plan.plan_duration;
        const unit = plan.duration_unit;

        const unitMap = {
            '1': 'day',
            '2': 'month',
            '3': 'year'
        };

        const unitText = unitMap[unit] || 'month';
        const frequency = duration > 1 ? `every ${duration} ${unitText}s` : `per ${unitText}`;

        return `$${amount.toFixed(2)} ${frequency}`;
    };

    const parsePlanContent = (htmlContent) => {
        return { __html: htmlContent };
    };

    function formatNextPaymentDate(dateStr) {
        if (!dateStr) return "";

        const [day, month, year] = dateStr.split("-");
        const formattedDate = new Date(`${year}-${month}-${day}`);

        return `Next Payment: ${formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}`;
    }

    const formatPaymentDate = (dateStr) => {
        if (!dateStr) return "";

        const [datePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split("-");
        const formattedDate = new Date(`${year}-${month}-${day}`);

        return formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getCardIcon = (paymentType) => {
        switch (paymentType?.toLowerCase()) {
            case 'visa':
                return "/coachsparkle/images/visa-card.png";
            case 'mastercard':
            case 'master card':
                return "/coachsparkle/images/master-card.png";
            case 'amex':
            case 'american express':
                return "/coachsparkle/images/amex-card.png";
            default:
                return "/coachsparkle/images/credit-card.png";
        }
    };

    useEffect(() => {
        if (isProUser) {
            fetchPaymentHistory();
        }
    }, [isProUser]);

    const stripe = useStripe()
    const elements = useElements()

    const handleSaveCard = async () => {
        if (!stripe || !elements) return

        setSavingCard(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-method/setup-intent`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const { client_secret } = await res.json()

            const result = await stripe.confirmCardSetup(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })

            if (result.error) {
                toast.error(result.error.message)
                return
            }

            const storeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-method/store`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_method_id: result.setupIntent.payment_method
                })
            })

            const data = await storeRes.json()

            if (data.success) {
                toast.success('Card added successfully')
                setShowAddCardModal(false)
                fetchCards()
            } else {
                toast.error(data.message || 'Failed to save card')
            }

        } catch (err) {
            toast.error('Something went wrong, try again')
        } finally {
            setSavingCard(false)
        }
    }

    const handleMakeDefault = async (pmId) => {
        setMakingDefault(pmId)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-method/set-default`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payment_method_id: pmId })
        })

        const data = await res.json()

        if (data.success) {
            toast.success('Default card updated!')
            fetchCards()
        } else {
            toast.error(data.message || 'Failed to update default')
        }

        setMakingDefault(null)
    }


    const handleRemove = async (pmId) => {
        setRemovingCard(pmId)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-method/remove/${pmId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await res.json()

        if (data.success) {
            toast.success('Card removed')
            fetchCards()
        } else {
            toast.error(data.message || 'Failed to remove card')
        }

        setRemovingCard(null)
    }

    const manualRenew = async (id) => {
        const res = await fetch(`${API}/subscription/manual-renew`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subscription_id: id })
        });

        const data = await res.json();
        if (data.success) {
            alert('Renewed Successfully');
            fetchSubscription();
        } else {
            alert(data.message);
        }
    };

    const toggleAutoRenew = async () => {
        const newState = !autoRenew;
        setAutoRenew(newState);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/auto-renew`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auto_renew: newState })
        });

        const data = await res.json();

        if (!data.success) {
            alert(data.message || "Failed to update auto renewal");
            setAutoRenew(!newState); // revert on error
        }
    };



    return (
        <>
            <div className="pro-coach-banner row align-items-center justify-content-between">
                <div className="col-md-7 mb-4 mb-md-0 pro-coach-banner-botm">
                    <h4 className="fw-bold you-currently-text">You are currently on {isProUser ? "Pro Coach Plan" : "Basic Plan"} </h4>
                    <p className="leverage-text">
                        {isProUser ? "Leverage on the advanced tools, smarter insights, and exclusive features to grow your coaching business faster." :
                            " Unlock all premium features, get more insights and exclusive features to grow coaching business faster."}
                    </p>
                    {!isProUser && (
                        <button
                            className="btn btn-not-pro-learn mt-2"
                            onClick={handleOpenPlansModal}
                        >
                            Upgrade
                        </button>
                    )}
                    <button className="btn btn-learn mt-2">Learn More</button>
                </div>
                <div className="col-md-5 pro-plan-right-side-img">
                    <Image
                        src={`${FRONTEND_BASE_URL}/images/pro-plan-img.webp`}
                        alt="Image 1"
                        className="img-fluid"
                        width={1000}
                        height={226}
                    />
                </div>
            </div>

            <div className="current-sub-plan card">
                {isProUser ? <div className="notification-bar">
                    <i className="bi bi-bell-fill"></i> Notifications
                </div> : null}

                <h4>Your Current Subscription</h4>

                <div className="subscription-card mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge-active">Active Plan</span>
                        {isProUser ? <div className="monthly-paid readonly-toggle">
                            <ToggleSwitch
                                value={user?.subscription_plan?.duration_unit}
                                // onChange={setActivePlanEnable}
                                onLabel={user?.subscription_plan?.duration_unit}
                                // offLabel="Yearly"
                                disabled={true}
                            />
                        </div> : ''}
                    </div>
                    <div className="subscription-title">{isProUser ? user?.subscription_plan?.plan_name : "Basic Plan"}</div>
                    <div className="subscription-price">${isProUser ? user?.subscription_plan?.amount : "0/month"}</div>
                    {isProUser ? <div className="next--payment-text mb-3 pt-1">
                        {formatNextPaymentDate(user?.subscription_plan?.end_date)}
                    </div> : <div className="next--payment-text mb-3 pt-1">
                        Basic profile, limited features
                    </div>
                    }

                    {isProUser ? (
                        <>
                            <h5>You're enjoying:</h5>
                            <ul className="benefit-list ps-0">
                                <li><i className="bi bi-check-circle-fill"></i> Unlimited service packages</li>
                                <li><i className="bi bi-check-circle-fill"></i> Real-time coaching requests</li>
                                <li><i className="bi bi-check-circle-fill"></i> Smart calendar sync & insights</li>
                                <li><i className="bi bi-check-circle-fill"></i> Full analytics dashboard</li>
                                <li className="staying-add">
                                    <img src="/coachsparkle/images/pro-clients-icons.png" />
                                    Staying on pro helps you attract more clients and grow faster.
                                </li>
                            </ul>

                            {/* <div className="d-flex align-items-center mt-3 auto-renew-add">
                                <div className="form-check form-switch me-3">
                                    <ToggleSwitch
                                        value={autoRenew}
                                        onChange={setAutoRenew}
                                        onLabel="On"
                                        offLabel="Off"
                                    />
                                    <label className="form-check-label" htmlFor="autoRenew">Auto Renew is On</label>
                                </div>
                                <button className="btn btn-primary btn-sm">Manage</button>
                            </div> */}
                        </>
                    ) : (
                        <div className="try-pro-free">
                            <p className="try-text-add">Try Pro Coach Plan - First 3 Months Free!</p>
                            <ul>
                                <li><i className="bi bi-check-circle-fill"></i> AI Matching</li>
                                <li><i className="bi bi-check-circle-fill"></i> Real-Time Requests</li>
                                <li><i className="bi bi-check-circle-fill"></i> Full Analytics</li>
                            </ul>
                            {user.subscription_plan &&
                                ['retrying', 'manual_pending', 'expired'].includes(user.subscription_plan.renewal_status) && (
                                    <button className="btn btn-primary" onClick={() => manualRenew(sub.id)}>
                                        Renew Now
                                    </button>
                                )}
                            <button onClick={handleOpenPlansModal}>
                                Unlock Pro Now <EastIcon className='mui-icons' />
                            </button>
                        </div>
                    )}
                </div>

                {/* Plans Modal */}
                {showPlansModal && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Choose Your Plan</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCloseModal}
                                        disabled={processingPayment !== null}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {loading ? (
                                        <div className="text-center py-4">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Loading plans...</p>
                                        </div>
                                    ) : error ? (
                                        <div className="alert alert-danger text-center">
                                            {error}
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={fetchPlans}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="row choose-your-plan-popup">
                                            {plans.map((plan) => (
                                                <div key={plan.id} className={`col-md-6 mb-4 ${plan.duration_unit_name}`}>
                                                    <div className="card your-plan-popup">
                                                        <div className="card-header">
                                                            <h5 className="card-title mb-0">{plan.plan_name}</h5>
                                                            {plan.is_active === 0 && (
                                                                <span className="badge bg-warning ms-2">Inactive</span>
                                                            )}
                                                        </div>
                                                        <div className="card-body">
                                                            <div
                                                                className="plan-features mb-3"
                                                                dangerouslySetInnerHTML={parsePlanContent(plan.plan_content)}
                                                            />
                                                            <div className="plan-price mb-3">
                                                                <h3 className="text-primary">
                                                                    <span className='dollar_text'>$</span>{parseFloat(plan.plan_amount).toFixed(2)}
                                                                </h3>
                                                                <small className="doller_price">
                                                                    {formatPrice(plan)}
                                                                </small>
                                                            </div>
                                                        </div>


                                                        <div className="free-list-plan">
                                                            {plan?.features && plan.features.length > 0 ? (
                                                                <ul className="features-list">
                                                                    {plan.features.map((feature) => (
                                                                        <li key={feature.id}>
                                                                            <i className="bi bi-check"></i>
                                                                            {feature.feature_text}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <ul className="features-list">
                                                                    <li>No Features Available</li>
                                                                </ul>
                                                            )}
                                                            {/* {plan?.features && plan.features.length > 0 &&
                                                                <ul>
                                                                    <li><i className="bi bi-check"></i> Basic Listing in 1 Category</li>
                                                                    <li><i className="bi bi-check"></i> 500 Character Bio + Photo</li>
                                                                    <li><i className="bi bi-check"></i> Standard AI Matching</li>
                                                                    <li><i className="bi bi-check"></i> Up to 5 Coaching Requests/Month</li>
                                                                </ul>} */}

                                                            <button
                                                                className="btn btn-primary w-100"
                                                                onClick={() => handleSelectPlan(plan.id, plan.plan_name)}
                                                                disabled={processingPayment === plan.id || plan.is_active === 0}
                                                            >
                                                                {processingPayment === plan.id ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                        Processing...
                                                                    </>
                                                                ) : (
                                                                    `Select ${plan.plan_name}`
                                                                )}
                                                            </button>
                                                        </div>
                                                        {/* 
                                                        <div className="card-footer">
                                                            <button
                                                                className="btn btn-primary w-100"
                                                                onClick={() => handleSelectPlan(plan.id, plan.plan_name)}
                                                                disabled={processingPayment === plan.id || plan.is_active === 0}
                                                            >
                                                                {processingPayment === plan.id ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                        Processing...
                                                                    </>
                                                                ) : (
                                                                    `Select ${plan.plan_name}`
                                                                )}
                                                            </button>
                                                            {plan.is_active === 0 && (
                                                                <small className="text-muted d-block mt-1 text-center">
                                                                    This plan is currently unavailable
                                                                </small>
                                                            )}
                                                        </div> */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {error && !loading && (
                                        <div className="alert alert-danger mt-3">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCloseModal}
                                        disabled={processingPayment !== null}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Method Section */}
                {isProUser ? (
                    <>
                        {/* Payment Methods Section */}
                        <div className="payment-method-part mt-4">
                            <h4>Payment Methods</h4>

                            <div className="card p-3">
                                {cards && cards.length > 0 ? (
                                    <>
                                        {cards.map((card, index) => (
                                            <div key={index} className={`d-flex align-items-center justify-content-between border rounded p-3 mb-2 ${card.is_default ? 'bg-light border-primary' : ''}`}>

                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={getCardIcon(card.brand)}
                                                        width="50"
                                                        className="me-3"
                                                    />

                                                    <div>
                                                        <div className="fw-bold">
                                                            {card.brand?.toUpperCase()} •••• {card.last4}
                                                        </div>
                                                        <div className="text-muted small">
                                                            Expires {card.exp_month}/{card.exp_year}
                                                        </div>
                                                        {!!card.is_default && (
                                                            <span className="badge bg-success mt-1">Default</span>
                                                        )}

                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center gap-2">
                                                    {!card.is_default && (
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleMakeDefault(card.stripe_payment_method_id)}
                                                            disabled={makingDefault === card.stripe_payment_method_id}
                                                        >
                                                            {makingDefault === card.stripe_payment_method_id ? "Saving..." : "Make Default"}
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        disabled={removingCard === card.stripe_payment_method_id || card.is_default}
                                                        onClick={() => handleRemove(card.stripe_payment_method_id)}
                                                    >
                                                        {removingCard === card.stripe_payment_method_id ? "Removing..." : "Remove"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="text-center mt-3">
                                            <button className="btn btn-outline-primary" onClick={() => setShowAddCardModal(true)}>
                                                + Add New Card
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-5">
                                        <p className="text-muted mb-3">No payment methods found</p>
                                        <button className="btn btn-outline-primary" onClick={() => setShowAddCardModal(true)}>
                                            + Add Card
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Auto Renew Section */}
                        <div className="mt-4">
                            <h4>Auto Renewal</h4>

                            <div className="card p-3 d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    <div className="fw-bold">Auto-renew is {autoRenew ? 'ON' : 'OFF'}</div>
                                    <small className="text-muted">
                                        {autoRenew
                                            ? `Renews on ${formatNextPaymentDate(user?.subscription_plan?.end_date)}`
                                            : `Ends on ${formatNextPaymentDate(user?.subscription_plan?.end_date)} (will not renew)`
                                        }
                                    </small>
                                </div>

                                <div>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={autoRenew}
                                            onChange={toggleAutoRenew}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Payment History Section */}
                        <div className="payment-history mt-4">
                            <h4>Payment History</h4>
                            {paymentHistoryLoading ? (
                                <div className="table-responsive card">
                                    <table className="table table-bordered bg-white">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Plan</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p className="mt-2">Loading payment history...</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                            ) : paymentHistory.length > 0 ? (
                                <div className="table-responsive card">
                                    <table className="table table-bordered bg-white">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Plan</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paymentHistory.map((payment) => (
                                                <tr key={payment.id}>
                                                    <td>{formatPaymentDate(payment.payment_date)}</td>
                                                    <td>{payment.plan_name}</td>
                                                    <td>${payment.amount}</td>
                                                    <td>
                                                        <span className={`status-${payment.payment_status.toLowerCase()}`}>
                                                            {payment.payment_status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {payment.pdf ? (
                                                            <a
                                                                href={payment.pdf}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-decoration-none"
                                                            >
                                                                Download &gt;
                                                            </a>
                                                        ) : (
                                                            <span className="text-muted">N/A</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (

                                <div className="table-responsive card">
                                    <table className="table table-bordered bg-white">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Plan</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    <p className="text-muted">No payment history found</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
                {/* Add Card Modal */}
                {showAddCardModal && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Card</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowAddCardModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Card Details</label>
                                        <div className="border rounded p-3">
                                            <div className="text-muted small">
                                                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowAddCardModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSaveCard} disabled={savingCard}>
                                        {savingCard ? "Saving..." : "Save Card"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}