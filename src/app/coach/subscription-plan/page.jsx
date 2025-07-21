"use client";
import { useState } from "react";
import "../_styles/subscription_plan.css";
import ToggleSwitch from "@/components/ToggleSwitch";

export default function SubscriptionPlan() {
    const [activePlanEnable, setActivePlanEnable] = useState(true);
    const [autoRenew, setAutoRenew] = useState(true);
    return (
        <div className="main-panel">

            <div className="new-content-wrapper coach-wrap">
                <div className="container subscription-view-plan">
                    <div className="pro-coach-banner row align-items-center justify-content-between">
                        <div className="col-md-7 mb-4 mb-md-0">
                            <h4 className="fw-bold you-currently-text">You are currently on Pro Coach Plan</h4>
                            <p className="leverage-text">Leverage on the advanced tools, smarter insights, and exclusive features to grow your coaching business faster.</p>
                            <button className="btn btn-learn mt-2">Learn More</button>
                        </div>
                        <div className="col-md-5 pro-plan-right-side-img">
                            <img src="/coachsparkle/images/pro-plan-img.webp" alt="Coaches" className="coach-image" />
                        </div>
                    </div>

                    <div className="current-sub-plan card">
                        <div className="notification-bar">
                            <i className="bi bi-bell-fill"></i> Notifications
                        </div>

                        <h4>Your Current Subscription</h4>

                        <div className="subscription-card mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge-active">Active Plan</span>
                                <div className="monthly-paid">
                                <ToggleSwitch
                value={activePlanEnable}
                onChange={setActivePlanEnable}
                onLabel="Monthly"
                offLabel="Yearly"
              />

                                </div>
                            </div>
                            <div className="subscription-title">Pro Coach Plan</div>
                            <div className="subscription-price">$25/month</div>
                            <div className="next--payment-text mb-3">Next Payment: Aug 30, 2025</div>

                            <h5>You're enjoying:</h5>
                            <ul className="benefit-list ps-0">
                                <li><i className="bi bi-check-circle-fill"></i> Unlimited service packages</li>
                                <li><i className="bi bi-check-circle-fill"></i> Real-time coaching requests</li>
                                <li><i className="bi bi-check-circle-fill"></i> Smart calendar sync & insights</li>
                                <li><i className="bi bi-check-circle-fill"></i> Full analytics dashboard</li>
                                <li><img src="/coachsparkle/images/pro-clients-icons.png" /> Staying on pro helps you attract more clients and grow faster.</li>
                            </ul>

                            <div className="d-flex align-items-center mt-3 auto-renew-add">
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
                            </div>
                        </div>


                        <div className="payment-method-part">
                            <h4>Payment Method</h4>


                            <div className="payment-method">
                                <div className="payment-method-card active">
                                    <i className="bi bi-check-circle-fill"></i>
                                    <small>Credit Card</small>
                                    <div className="debit-card-inner">


                                        <div><img src="/coachsparkle/images/master-card.png" width="40" alt="MasterCard" /></div>
                                        <div className="card-number">**** **** **** 3512</div>
                                    </div>
                                    <div className="remove-btn">&minus;</div>
                                </div>

                                <div className="payment-method-card">
                                    <small>Debit Card</small>
                                    <div className="debit-card-inner">
                                        <div><img src="/coachsparkle/images/visa-card.png" width="40" alt="Visa" /></div>
                                        <div className="card-number">**** **** **** 1543</div>
                                    </div>
                                    <div className="remove-btn">&minus;</div>


                                </div>

                                <div className="payment-method-card d-flex justify-content-center align-items-center">
                                    <div className="add-icon">+</div>
                                </div>
                            </div>
                        </div>

                        <div className="payment-history">

                            <h4>Payment History</h4>
                            <div className="table-responsive card">
                                <table className="table table-bordered bg-white">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Apr 20, 2025</td>
                                            <td>$25.00</td>
                                            <td><span className="status-paid">Paid</span></td>
                                            <td><a href="#">Download &gt;</a></td>
                                        </tr>
                                        <tr>
                                            <td>Mar 20, 2025</td>
                                            <td>$25.00</td>
                                            <td><span className="status-paid">Paid</span></td>
                                            <td><a href="#">Download &gt;</a></td>
                                        </tr>
                                        <tr>
                                            <td>Feb 20, 2025</td>
                                            <td>$25.00</td>
                                            <td><span className="status-paid">Paid</span></td>
                                            <td><a href="#">Download &gt;</a></td>
                                        </tr>
                                        <tr>
                                            <td>Jan 20, 2025</td>
                                            <td>$25.00</td>
                                            <td><span className="status-paid">Paid</span></td>
                                            <td><a href="#">Download &gt;</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>


                    </div>
                </div>


            </div>



        </div>



    );
}