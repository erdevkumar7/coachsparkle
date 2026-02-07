"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, ArrowRight, AlertCircle } from "lucide-react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from "next/link";

const SparkleBot = ({
    initialQuery,
    apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost/coach-backend/api",
}) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [matches, setMatches] = useState([]);
    const [minimized, setMinimized] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);

    const [responses, setResponses] = useState({
        initialGoal: "",
        desiredOutcome: "",
    });

    useEffect(() => {
        if (initialQuery) {
            setResponses((prev) => ({ ...prev, initialGoal: initialQuery }));
            setStep(1);
        }
    }, [initialQuery]);

    // 🔹 ONLY TWO STEPS NOW
    const messages = [
        {
            bot: "Hi, This is Sparkle AI Match — I’ll help you find the right coach for your goals.",
            hint: "Tell me briefly what brings you here",
            type: "text",
            field: "initialGoal",
        },
        {
            bot: "Great — what outcome would make this a success for you?",
            hint: "(e.g., clarity, promotion, confidence)",
            type: "text",
            field: "desiredOutcome",
        },
    ];

    const handleTextSubmit = async (value) => {
        const field = messages[step].field;
        const updatedResponses = { ...responses, [field]: value };
        setResponses(updatedResponses);

        if (step === 1) {
            await fetchMatches(updatedResponses);
        } else {
            setStep((s) => s + 1);
        }
    };

    const fetchMatches = async (payload) => {
        setLoading(true);
        setError(null);
        setValidationErrors(null);

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            const endpoint = `${String(apiUrl).replace(/\/$/, "")}/coaches/match`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    initial_goal: payload.initialGoal,
                    desired_outcome: payload.desiredOutcome,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeout);

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (!response.ok) {
                if (response.status === 422) {
                    setValidationErrors(data?.errors || data);
                    setError(data?.message || "Validation failed.");
                    return;
                }
                throw new Error(data?.message || "Failed to fetch matches");
            }

            if (data?.success && data?.matches) {
                const transformedMatches = data.matches.map((coach) => ({
                    id: coach.id,
                    name: coach.name,
                    title: coach.title,
                    experience: coach.experience_years || "N/A",
                    rating: coach.rating,
                    sessions: coach.total_sessions,
                    price: coach.price_display,
                    avatarColor: getRandomColor(),
                    languages: coach.languages || [],
                    specialties: coach.specialties || [],
                    matchReason: coach.match_reason,
                    matchScore: coach.match_score,
                    matchPercentage: coach.match_percentage,
                    photo: coach.photo,
                    avatar: coach.avatar,
                    profileUrl: coach.profile_url,
                    latest_package_id: coach.latest_package_id,
                }));

                setMatches(transformedMatches);
                setStep(2);
            } else {
                throw new Error("No matches found");
            }
        } catch (err) {
            if (err.name === "AbortError") {
                setError("Request timed out — please try again.");
            } else {
                setError(err.message || "Failed to connect to matching service");
            }
        } finally {
            setLoading(false);
        }
    };

    const getRandomColor = () => {
        const colors = ["#FDE68A", "#BFDBFE", "#FCA5A5", "#D8B4FE", "#A7F3D0"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    // ────────────────────────────────────────────────
    // UI Components
    // ────────────────────────────────────────────────

    const Progress = ({ stepIndex }) => (
        <div className="sb-progress" aria-hidden>
            {[0, 1, 2].map((i) => (
                <div key={i} className={`dot ${i <= stepIndex ? "active" : ""}`} />
            ))}
        </div>
    );

    const TextInput = ({ onSubmit, placeholder }) => {
        const [value, setValue] = useState("");
        return (
            <div className="sb-input">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && value.trim()) {
                            e.preventDefault();
                            onSubmit(value.trim());
                        }
                    }}
                    placeholder={placeholder}
                    className="form-control sb-text"
                    rows={2}
                    autoFocus
                />
                <button
                    className="btn btn-primary sb-submit"
                    onClick={() => value.trim() && onSubmit(value.trim())}
                    disabled={!value.trim()}
                >
                    <ArrowRight />
                </button>
            </div>
        );
    };

    const CoachCard = ({ coach }) => (
        <div className="card sb-coach-card mb-3">
            <div className="card-body d-flex gap-3 align-items-start profie-detail-add">
                <div className="sb-avatar-wrapper">
                    {coach.photo || coach.avatar ? (
                        <img
                            src={coach.photo || coach.avatar}
                            alt={coach.name}
                            className="sb-avatar-img"
                        />
                    ) : (
                        <div
                            className="sb-avatar"
                            style={{ background: coach.avatarColor }}
                        >
                            {getInitials(coach.name)}
                        </div>
                    )}
                </div>

                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 className="mb-1">{coach.name}</h5>
                            <div className="small text-muted">
                                {coach.title} • {coach.experience}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-primary">{coach.price}</div>
                        </div>
                    </div>

                    {coach.matchPercentage && (
                        <div className="mt-2 mb-2">
                            <span className="badge bg-success">
                                {coach.matchPercentage}% Match
                            </span>
                        </div>
                    )}

                    <div className="mt-2 p-2 bg-light rounded small">
                        <AutoAwesomeIcon fontSize="small" className="me-1 text-primary" />
                        {coach.matchReason}
                    </div>

                    <div className="mt-3 d-flex gap-2 two-btn-view">
                        <Link href={`/coach-detail/${coach.id}`}>
                            <button className="btn btn-outline-primary btn-sm">
                                View Profile
                            </button>
                        </Link>

                        <button className="btn btn-primary btn-sm">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );

    // ────────────────────────────────────────────────
    // Main Render
    // ────────────────────────────────────────────────

    return (
        <div className={`sparklebot-container ${minimized ? "minimized" : ""}`}>
            {error && (
                <div className="sb-error-toast">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {minimized ? (
                <button
                    className="sb-floating-btn"
                    onClick={() => setMinimized(false)}
                >
                    <AutoAwesomeIcon />
                </button>
            ) : (
                <div className="sparklebot-wrapper card p-3 shadow-sm">
                    {/* 🔹 HEADER (RESTORED) */}
                    <div className="d-flex align-items-center mb-2">
                        <div className="me-2 sb-logo">
                            <AutoAwesomeIcon />
                        </div>
                        <div className="sparkle-goals-text">
                            <strong>Sparkle AI Match</strong>
                            <div className="small text-muted">
                                AI matching tailored to your goals
                            </div>
                        </div>
                    </div>

                    <Progress stepIndex={step} />

                    <div className="sb-body sparkle-goals-content">
                        {step < 2 ? (
                            <>
                                <div className="bot-msg p-3 mb-3 rounded bg-light">
                                    <MessageCircle className="me-2" />
                                    <strong>{messages[step].bot}</strong>
                                    <div className="small text-muted">
                                        {messages[step].hint}
                                    </div>
                                </div>

                                <TextInput
                                    onSubmit={handleTextSubmit}
                                    placeholder={messages[step].hint}
                                />
                            </>
                        ) : loading ? (
                            <div className="d-flex align-items-center gap-2 p-5 justify-content-center flex-column">
                                <AutoAwesomeIcon className="spin" sx={{ fontSize: 48 }} />
                                <div className="fw-medium">
                                    Finding your perfect matches…
                                </div>
                                <div className="small text-muted">
                                    Analyzing coach profiles
                                </div>
                            </div>
                        ) : matches.length > 0 ? (
                            <div>
                                <div className="d-flex justify-content-between align-items-center best-matches mb-3">
                                    <h5 className="mb-0">Your Best Matches</h5>
                                    <div className="small text-muted">
                                        {matches.length} coaches found
                                    </div>
                                </div>

                                {matches.map((c) => (
                                    <CoachCard key={c.id} coach={c} />
                                ))}

                                <div className="mt-4 d-flex gap-2 justify-content-end start-over-btn-add">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => {
                                            setStep(0);
                                            setMatches([]);
                                            setResponses({
                                                initialGoal: "",
                                                desiredOutcome: "",
                                            });
                                        }}
                                    >
                                        Start Over
                                    </button>
                                    <Link
                                        href="/coach-detail/list"
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        Explore All Coaches
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="mb-3 fs-1">
                                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                                </div>
                                <p className="text-muted">
                                    No matches found. Try adjusting your goals.
                                </p>
                                <button
                                    className="btn btn-primary over-start-btn mt-3"
                                    onClick={() => {
                                        setStep(0);
                                        setResponses({
                                            initialGoal: "",
                                            desiredOutcome: "",
                                        });
                                    }}
                                >
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SparkleBot;
