"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, MessageCircle, ArrowRight, X, Check, AlertCircle } from "lucide-react";
// import "../../_styles/coach-list.css";

const SparkleBot = ({ initialQuery, apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/coach-backend/api' }) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [matches, setMatches] = useState([]);
    const [minimized, setMinimized] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);

    const [responses, setResponses] = useState({
        initialGoal: "",
        desiredOutcome: "",
        coachingStyle: "",
        industryExperience: "",
        language: "",
        budget: "",
        mode: ""
    });

    useEffect(() => {
        if (initialQuery) {
            setResponses(prev => ({ ...prev, initialGoal: initialQuery }));
            setStep(1);
        }
    }, [initialQuery]);

    const messages = [
        {
            bot: "Hi, I’m SparkleBot — I’ll help you find the right coach for your goals.",
            hint: "Tell me briefly what brings you here",
            type: "text",
            field: "initialGoal"
        },
        {
            bot: "Great — what outcome would make this a success for you?",
            hint: "(e.g., clarity, promotion, confidence)",
            type: "text",
            field: "desiredOutcome"
        },
        {
            bot: "Which coaching approach suits you best?",
            type: "choice",
            field: "coachingStyle",
            options: [
                { id: "structured", label: "Structured, goal-oriented coaching" },
                { id: "reflective", label: "Reflective, insight-driven" },
                { id: "flexible", label: "Flexible & exploratory" }
            ]
        },
        {
            bot: "Just a few quick preferences so I can refine matches.",
            type: "multi"
        }
    ];

    const handleTextSubmit = (value) => {
        const field = messages[step].field;
        setResponses(prev => ({ ...prev, [field]: value }));
        setStep(s => s + 1);
    };

    const handleChoiceSelect = (choiceId, label) => {
        const field = messages[step].field;
        // store both id and label to increase compatibility with backend expectations
        setResponses(prev => ({ ...prev, [field]: choiceId, [`${field}Label`]: label }));
        setStep(s => s + 1);
    };

    const handleMultiSubmit = async (prefs) => {
        const fullResponses = { ...responses, ...prefs };
        setResponses(fullResponses);
        setLoading(true);
        setError(null);
        setValidationErrors(null);

        try {
            // Add timeout and sanitize apiUrl
            const controller = new AbortController();
            const timeoutMs = 10000; // 10s
            const timeout = setTimeout(() => controller.abort(), timeoutMs);

            const endpoint = `${String(apiUrl).replace(/\/$/, '')}/coaches/match`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    initial_goal: fullResponses.initialGoal,
                    desired_outcome: fullResponses.desiredOutcome,
                    coaching_style: fullResponses.coachingStyle,
                    industry_experience: fullResponses.industryExperience,
                    language: fullResponses.language,
                    budget: fullResponses.budget || '$80–$150',
                    mode: fullResponses.mode,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeout);

            // Try to parse response body safely
            let data = null;
            const text = await response.text();
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                data = { raw: text };
            }

            if (!response.ok) {
                if (response.status === 422) {
                    // Validation errors from Laravel: { message: 'Validation failed', errors: { field: [..] } }
                    const validation = data?.errors || data?.validation || data;
                    setValidationErrors(validation);
                    setError(data?.message || 'Validation failed. Please review your inputs.');
                    return; // allow user to fix inputs
                }

                const msg = data?.message || data?.raw || `Status ${response.status}`;
                throw new Error(`Server returned ${response.status}: ${msg}`);
            }

            if (data && data.success && data.matches) {
                // Transform API response to component format
                const transformedMatches = data.matches.map(coach => ({
                    id: coach.id,
                    name: coach.name,
                    title: coach.title,
                    experience: coach.experience_years || 'N/A',
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
                }));

                setMatches(transformedMatches);
                setStep(s => s + 1);
            } else {
                throw new Error(data?.message || 'Failed to find matches');
            }
        } catch (err) {
            console.error('API Error:', err);

            if (err.name === 'AbortError') {
                setError('Request timed out — please try again.');
            } else if (err.message && err.message.includes('Failed to fetch')) {
                // Common network error (CORS / DNS / invalid URL)
                setError('Network error: failed to reach matching service. Check your API URL and CORS settings.');
            } else {
                setError(err.message || 'Failed to connect to matching service');
            }

            // Show transient error
            setTimeout(() => setError(null), 6000);
        } finally {
            setLoading(false);
        }
    };

    const getRandomColor = () => {
        const colors = ['#FDE68A', '#BFDBFE', '#FCA5A5', '#D8B4FE', '#A7F3D0'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    /* ---------- UI subcomponents ---------- */
    const Progress = ({ stepIndex }) => (
        <div className="sb-progress" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`dot ${i <= stepIndex ? 'active' : ''}`} />
            ))}
        </div>
    );

    const TextInput = ({ onSubmit, placeholder }) => {
        const [value, setValue] = useState('');
        return (
            <div className="sb-input">
                <label className="visually-hidden">Answer</label>
                <textarea
                    aria-label="Your answer"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
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
                    aria-label="Submit answer"
                >
                    <ArrowRight />
                </button>
            </div>
        );
    };

    const ChoiceButtons = ({ options, onSelect }) => (
        <div className="sb-choices">
            {options.map(opt => (
                <button key={opt.id} className="btn sb-choice" onClick={() => onSelect(opt.id, opt.label)}>
                    <div className="choice-title">{opt.label}</div>
                </button>
            ))}
        </div>
    );

    const MultiStepForm = ({ onSubmit }) => {
        const [prefs, setPrefs] = useState({
            industryExperience: '',
            language: '',
            budget: '',
            mode: ''
        });

        const questions = [
            {
                label: 'Industry experience',
                field: 'industryExperience',
                options: ['Yes', 'No', 'Not important']
            },
            {
                label: 'Language',
                field: 'language',
                options: ['English', 'Mandarin', 'Tamil', 'Malay', 'Others']
            },
            {
                label: 'Budget per session',
                field: 'budget',
                options: ['< $80', '$80–$150', '$150–$300', 'No preference yet']
            },
            {
                label: 'Mode',
                field: 'mode',
                options: ['Online', 'Face-to-face', 'Hybrid', 'No preference']
            }
        ];

        const allAnswered = Object.values(prefs).every(Boolean);

        return (
            <div className="sb-multi">
                {questions.map(q => (
                    <div key={q.field} className="mb-3">
                        <div className="small text-muted mb-2">{q.label}</div>
                        <div className="d-flex gap-2 flex-wrap industry-add-content">
                            {q.options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setPrefs(p => ({ ...p, [q.field]: opt }))}
                                    className={`btn ${prefs[q.field] === opt ? 'btn-primary' : 'btn-outline-secondary'} btn-sm`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-end find-my-matches-btn-add">
                    <button
                        className="btn d-flex align-items-center gap-2"
                        disabled={!allAnswered}
                        onClick={() => onSubmit(prefs)}
                    >
                        <Sparkles size={16} />
                        Find My Matches
                    </button>
                </div>
            </div>
        );
    };

    const CoachCard = ({ coach }) => (
        <div className="card sb-coach-card mb-3">
            <div className="card-body d-flex gap-3 align-items-start">
                {/* Avatar */}
                <div className="sb-avatar-wrapper">
                    {coach.photo || coach.avatar ? (
                        <img
                            src={coach.photo || coach.avatar}
                            alt={coach.name}
                            className="sb-avatar-img"
                        />
                    ) : (
                        <div className="sb-avatar" style={{ background: coach.avatarColor }}>
                            {getInitials(coach.name)}
                        </div>
                    )}
                </div>

                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 className="mb-1">{coach.name}</h5>
                            <div className="small text-muted">{coach.title} • {coach.experience}</div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-primary">{coach.price}</div>
                            <div className="sb-rating">
                                {Array.from({length: 5}).map((_, i) => (
                                    <span key={i} className={`star ${i < Math.round(coach.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="small text-muted ms-1">({coach.sessions})</span>
                            </div>
                        </div>
                    </div>

                    {/* Match Score */}
                    {coach.matchPercentage && (
                        <div className="mt-2 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                {/* <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                    <div
                                        className="progress-bar bg-success"
                                        style={{ width: `${coach.matchPercentage}%` }}
                                    />
                                </div> */}
                                <span className="badge bg-success">{coach.matchPercentage}% Match</span>
                            </div>
                        </div>
                    )}

                    {/* Match Reason */}
                    <div className="mt-2 p-2 bg-light rounded">
                        <div className="small d-flex align-items-start gap-2">
                            <Sparkles size={14} className="text-primary mt-1 flex-shrink-0" />
                            <span className="text-muted">{coach.matchReason}</span>
                        </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-2">
                        {coach.specialties.slice(0, 3).map(s => (
                            <span key={s} className="badge bg-secondary me-1 mb-1">{s}</span>
                        ))}
                    </div>

                    {/* Languages */}
                    {coach.languages.length > 0 && (
                        <div className="mt-2 small text-muted">
                            🗣️ {coach.languages.join(', ')}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 d-flex gap-2">
                        <a
                            href={coach.profileUrl || `/coach/${coach.id}`}
                            className="btn btn-outline-primary btn-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Profile
                        </a>
                        <button className="btn btn-primary btn-sm">Book Consultation</button>
                    </div>
                </div>
            </div>
        </div>
    );

    /* ---------- Render ---------- */
    return (
        <div className={`sparklebot-container ${minimized ? 'minimized' : ''}`} aria-live="polite">
            {/* Error Toast */}
            {error && (
                <div className="sb-error-toast">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="btn-close btn-close-white btn-sm" />
                </div>
            )}

            {/* Minimized floating button */}
            {minimized ? (
                <button className="sb-floating-btn" aria-label="Open SparkleBot" onClick={() => setMinimized(false)}>
                    <Sparkles />
                </button>
            ) : null}

            <div className="sparklebot-wrapper card p-3 shadow-sm">
                <div className="d-flex align-items-center mb-2">
                    <div className="me-2 sb-logo"><Sparkles /></div>
                    <div className="sparkle-goals-text">
                        <strong>SparkleBot</strong>
                        <div className="small text-muted">AI matching tailored to your goals</div>
                    </div>


                </div>

                <div className="sb-body sparkle-goals-content">
                    {step < 4 ? (
                        <>
                            <div className="bot-msg p-3 mb-3 rounded bg-light">

                                <div className="fw-semibold"><MessageCircle className="me-2" /> {messages[step].bot}</div>
                                {messages[step].hint && <div className="small text-muted mt-1">{messages[step].hint}</div>}
                            </div>

                            {messages[step].type === 'text' && (
                                <TextInput onSubmit={handleTextSubmit} placeholder={messages[step].hint || 'Type your answer'} />
                            )}

                            {messages[step].type === 'choice' && (
                                <>
                                  <ChoiceButtons options={messages[step].options} onSelect={handleChoiceSelect} />

                                  {/* Inline validation message for coaching_style */}
                                  {validationErrors?.coaching_style && (
                                    <div className="text-danger small mt-2">
                                      The selected coaching style is invalid. Please choose a different option.
                                    </div>
                                  )}
                                </>
                            )}

                            {messages[step].type === 'multi' && (
                                <MultiStepForm onSubmit={handleMultiSubmit} />
                            )}

                            {/* Show validation errors (if any) */}
                            {validationErrors && (
                                <div className="alert alert-danger mt-3 small">
                                    <strong>Validation issues:</strong>
                                    <ul className="mb-0 mt-1">
                                        {Object.entries(validationErrors).map(([field, msgs]) => (
                                            <li key={field}><strong>{field}:</strong> {Array.isArray(msgs) ? msgs.join(' ') : String(msgs)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-3 d-flex justify-content-between">
                                {/* <button className="btn btn-link btn-sm" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>Back</button> */}
                            </div>
                        </>
                    ) : loading ? (
                        <div className="d-flex align-items-center gap-2 p-5 justify-content-center flex-column">
                            <Sparkles className="spin" size={48} />
                            <div className="fw-medium">Finding your perfect matches…</div>
                            <div className="small text-muted">Analyzing 1000+ coach profiles</div>
                        </div>
                    ) : matches.length > 0 ? (
                        <div>
                            <div className="d-flex justify-content-between align-items-center best-matches mb-3">
                                <h5 className="mb-0">Your Best Matches</h5>
                                <div className="small text-muted">{matches.length} coaches found</div>
                            </div>

                            {matches.map(c => <CoachCard key={c.id} coach={c} />)}

                            <div className="mt-3 d-flex gap-2 justify-content-end start-over-btn-add">
                                <button className="btn btn-sm" onClick={() => { setStep(0); setMatches([]); setResponses({}); }}>
                                    Start Over
                                </button>
                                <button className="btn btn-sm">View All Coaches</button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <div className="mb-3">😔</div>
                            <p className="text-muted">No matches found. Try adjusting your preferences.</p>
                            <button className="btn over-start-btn" onClick={() => { setStep(0); setResponses({}); }}>
                                Start Over
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SparkleBot;
