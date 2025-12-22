"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, MessageCircle, ArrowRight, X, Check } from "lucide-react";
// import "../../_styles/coach-list.css";

const SparkleBot = ({ initialQuery }) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [minimized, setMinimized] = useState(false);

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

    const handleChoiceSelect = (choice) => {
        const field = messages[step].field;
        setResponses(prev => ({ ...prev, [field]: choice }));
        setStep(s => s + 1);
    };

    const handleMultiSubmit = async (prefs) => {
        setResponses(prev => ({ ...prev, ...prefs }));
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 900));

        setMatches([
            {
                id: 1,
                name: "Sarah Chen",
                title: "Career & Leadership Coach",
                experience: "12 yrs",
                rating: 4.9,
                sessions: 850,
                price: "$120",
                avatarColor: "#FDE68A",
                languages: ["English", "Mandarin"],
                specialties: ["Leadership", "Burnout Recovery"],
                matchReason: "Structured leadership coaching with measurable outcomes."
            },
            {
                id: 2,
                name: "David Kumar",
                title: "Mindfulness Coach",
                experience: "8 yrs",
                rating: 4.8,
                sessions: 620,
                price: "$95",
                avatarColor: "#BFDBFE",
                languages: ["English", "Tamil"],
                specialties: ["Stress", "Work-life Balance"],
                matchReason: "Focused on practical mindfulness techniques for stress reduction."
            }
        ]);

        setLoading(false);
        setStep(s => s + 1);
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
                <input
                    aria-label="Your answer"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && value && onSubmit(value)}
                    placeholder={placeholder}
                    className="form-control sb-text"
                    autoFocus
                />
                <button className="btn btn-primary sb-submit" onClick={() => value && onSubmit(value)} aria-label="Submit answer">
                    <ArrowRight />
                </button>
            </div>
        );
    };

    const ChoiceButtons = ({ options, onSelect }) => (
        <div className="sb-choices">
            {options.map(opt => (
                <button key={opt.id} className="btn btn-outline-secondary sb-choice" onClick={() => onSelect(opt.id)}>
                    <div className="choice-title">{opt.label}</div>
                </button>
            ))}
        </div>
    );

    const MultiStepForm = ({ onSubmit }) => {
        const [prefs, setPrefs] = useState({ industryExperience: '', language: '', budget: '', mode: '' });
        const questions = [
            { label: 'Industry experience', field: 'industryExperience', options: ['Yes', 'No'] },
            { label: 'Language', field: 'language', options: ['English', 'Tamil', 'Other'] },
            { label: 'Budget', field: 'budget', options: ['<$80', '$80–$150', '$150+'] },
            { label: 'Mode', field: 'mode', options: ['Online', 'Offline', 'Hybrid'] }
        ];

        const allAnswered = Object.values(prefs).every(Boolean);

        return (
            <div className="sb-multi">
                {questions.map(q => (
                    <div key={q.field} className="mb-3">
                        <div className="small text-muted mb-2">{q.label}</div>
                        <div className="d-flex gap-2 flex-wrap">
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

                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" disabled={!allAnswered} onClick={() => onSubmit(prefs)}>
                        Find My Matches ✨
                    </button>
                </div>
            </div>
        );
    };

    const CoachCard = ({ coach }) => (
        <div className="card sb-coach-card mb-3">
            <div className="card-body d-flex gap-3 align-items-start">
                <div className="sb-avatar" style={{ background: coach.avatarColor }} aria-hidden>
                    {coach.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                </div>
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 className="mb-1">{coach.name}</h5>
                            <div className="small text-muted">{coach.title} • {coach.experience}</div>
                        </div>
                        <div className="text-end">
                            <div className="small text-muted">{coach.price}</div>
                            <div className="sb-rating">{Array.from({length:5}).map((_,i)=> (
                                <span key={i} className={`star ${i < Math.round(coach.rating) ? 'filled':''}`}>★</span>
                            ))}</div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="small mb-1 text-muted">Specialties</div>
                        <div className="mb-2">{coach.specialties.map(s => <span key={s} className="badge bg-secondary me-1">{s}</span>)}</div>
                        <div className="text-muted small">{coach.matchReason}</div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm">View Profile</button>
                        <button className="btn btn-primary btn-sm">Book Consultation</button>
                    </div>
                </div>
            </div>
        </div>
    );

    /* ---------- Render ---------- */
    return (
        <div className={`sparklebot-container ${minimized ? 'minimized' : ''}`} aria-live="polite">
            {/* Minimized floating button */}
            {minimized ? (
                <button className="sb-floating-btn" aria-label="Open SparkleBot" onClick={() => setMinimized(false)}>
                    <Sparkles />
                </button>
            ) : null}

            <div className="sparklebot-wrapper card p-3 shadow-sm">
                <div className="d-flex align-items-center mb-2">
                    <div className="me-2 sb-logo"><Sparkles /></div>
                    <div>
                        <strong>SparkleBot</strong>
                        <div className="small text-muted">AI matching tailored to your goals</div>
                    </div>

                    <div className="ms-auto d-flex align-items-center gap-2">
                        <Progress stepIndex={step} />
                        <button className="btn btn-sm btn-light" aria-label="Minimize" onClick={() => setMinimized(true)}>
                            <X />
                        </button>
                    </div>
                </div>

                <div className="sb-body">
                    {step < 4 ? (
                        <>
                            <div className="bot-msg p-3 mb-3 rounded bg-light">
                                <MessageCircle className="me-2" />
                                <div className="fw-semibold">{messages[step].bot}</div>
                                {messages[step].hint && <div className="small text-muted mt-1">{messages[step].hint}</div>}
                            </div>

                            {messages[step].type === 'text' && (
                                <TextInput onSubmit={handleTextSubmit} placeholder={messages[step].hint || 'Type your answer'} />
                            )}

                            {messages[step].type === 'choice' && (
                                <ChoiceButtons options={messages[step].options} onSelect={handleChoiceSelect} />
                            )}

                            {messages[step].type === 'multi' && (
                                <MultiStepForm onSubmit={handleMultiSubmit} />
                            )}

                            <div className="mt-3 d-flex justify-content-between">
                                <button className="btn btn-link btn-sm" disabled={step===0} onClick={() => setStep(s => Math.max(0, s-1))}>Back</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => { setStep(4); setMatches([]); }}>Skip & View Sample Matches</button>
                            </div>
                        </>
                    ) : loading ? (
                        <div className="d-flex align-items-center gap-2 p-3 justify-content-center">
                            <Sparkles className="spin" /> <div className="fw-medium">Finding best matches…</div>
                        </div>
                    ) : (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Your Best Matches</h5>
                                <div className="small text-muted">Based on your preferences</div>
                            </div>

                            {matches.map(c => <CoachCard key={c.id} coach={c} />)}

                            <div className="mt-2 text-end">
                                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => setStep(0)}>Start Over</button>
                                <button className="btn btn-primary btn-sm">View All Coaches</button>
                            </div>
                        </div>
                    )}
                </div>

                <style jsx>{`
                    .sparklebot-container { position: fixed; z-index: 1200; right: 24px; bottom: 24px; }
                    .sparklebot-container.minimized { right: 24px; bottom: 24px; }

                    .sb-floating-btn { background: var(--bs-primary, #3b82f6); color: #fff; width:56px; height:56px; border-radius:50%; border:0; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 24px rgba(16,24,40,0.12); }

                    .sparklebot-wrapper { border-radius: 12px; overflow: hidden; box-shadow: 0 12px 40px rgba(13, 38, 59, 0.12); }
                    .sb-logo :global(svg) { color: var(--bs-primary, #3b82f6); }
                    .sb-progress { display:flex; gap:6px; align-items:center; }
                    .dot { width:8px; height:8px; border-radius:50%; background:#eef2ff; }
                    .dot.active { background: var(--bs-primary, #3b82f6); box-shadow: 0 0 0 6px rgba(59,130,246,0.06); }

                    .sb-input { display:flex; gap:8px; }
                    .sb-text { border-radius: 12px; padding: 12px 14px; box-shadow: inset 0 1px 2px rgba(16,24,40,0.02); }
                    .sb-submit { width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:10px; }

                    .sb-choices { display:flex; flex-direction:column; gap:8px; }
                    .sb-choice { text-align:left; padding:12px; border-radius:10px; transition: transform .12s ease, box-shadow .12s ease; }
                    .sb-choice:active { transform: translateY(1px); }

                    .sb-multi .btn { min-width:96px; }
                    .sb-avatar { width:56px; height:56px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; color:#0f172a; }
                    .sb-coach-card { border-radius:12px; }
                    .sb-rating .star { color:#e9ecef; }
                    .sb-rating .star.filled { color: #f59e0b; }
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

                    /* Responsive: bottom sheet on mobile */
                    @media (max-width: 767px) {
                        .sparklebot-container { left: 12px; right: 12px; bottom: 12px; }
                        .sparklebot-wrapper { width: auto; border-radius: 12px; }
                        .sb-floating-btn { position: fixed; right: 16px; bottom: 16px; }
                    }

                    /* Minimized state hides the card and shows floating button */
                    .sparklebot-container.minimized .sparklebot-wrapper { display: none; }

                    .visually-hidden { position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }
                `}</style>
            </div>
        </div>
    );
};

export default SparkleBot;
