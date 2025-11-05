"use client";
import Image from 'next/image';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState, useEffect } from "react";
import EastIcon from '@mui/icons-material/East';
import Cookies from 'js-cookie';

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

    console.log('usersss', user.subscription_plan)

    // Fetch payment history
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
                // Set current payment method from the most recent payment
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

    // Fetch plans from API
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

    // Handle plan selection and payment
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

    // Open modal and fetch plans
    const handleOpenPlansModal = () => {
        setShowPlansModal(true);
        fetchPlans();
    };

    // Close modal
    const handleCloseModal = () => {
        setShowPlansModal(false);
        setError('');
        setProcessingPayment(null);
    };

    // Format price display
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

    // Parse HTML content safely
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

    // Format payment date for display
    const formatPaymentDate = (dateStr) => {
        if (!dateStr) return "";

        // Handle "01-11-2025 12:21:04" format
        const [datePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split("-");
        const formattedDate = new Date(`${year}-${month}-${day}`);

        return formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Get card icon based on payment type
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

    // Fetch payment history when component mounts for Pro users
    useEffect(() => {
        if (isProUser) {
            fetchPaymentHistory();
        }
    }, [isProUser]);

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
                                        <div className="row">
                                            {plans.map((plan) => (
                                                <div key={plan.id} className="col-md-6 mb-4">
                                                    <div className="card h-100">
                                                        <div className="card-header">
                                                            <h5 className="card-title mb-0">{plan.plan_name}</h5>
                                                            {plan.is_active === 0 && (
                                                                <span className="badge bg-warning ms-2">Inactive</span>
                                                            )}
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="plan-price mb-3">
                                                                <h3 className="text-primary">
                                                                    ${parseFloat(plan.plan_amount).toFixed(2)}
                                                                </h3>
                                                                <small className="text-muted">
                                                                    {formatPrice(plan)}
                                                                </small>
                                                            </div>
                                                            <div
                                                                className="plan-features mb-3"
                                                                dangerouslySetInnerHTML={parsePlanContent(plan.plan_content)}
                                                            />
                                                        </div>
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
                                                        </div>
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
                        <div className="payment-method-part mt-4">
                            <h4>Payment Method</h4>
                            <div className="payment-method">
                                {currentPaymentMethod ? (
                                    <div className="payment-method-card active">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <small>
                                            {currentPaymentMethod.payment_method === 'card'
                                                ? 'Credit Card'
                                                : currentPaymentMethod.payment_method}
                                        </small>
                                        <div className="debit-card-inner">
                                            <div>
                                                <img
                                                    src={getCardIcon(currentPaymentMethod.payment_type)}
                                                    width="40"
                                                    alt={currentPaymentMethod.payment_type}
                                                />
                                            </div>
                                            <div className="card-number">
                                                **** **** **** {currentPaymentMethod.payment_last4}
                                            </div>
                                        </div>
                                        <div className="remove-btn">&minus;</div>
                                    </div>
                                ) : (
                                    <div className="text-center py-3">
                                        <p>No payment method found</p>
                                    </div>
                                )}

                                <div className="payment-method-card d-flex justify-content-center align-items-center">
                                    <div className="add-icon">+</div>
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
            </div>
        </>
    );
}