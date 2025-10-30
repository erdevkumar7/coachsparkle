"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EastIcon from '@mui/icons-material/East';

export default function FindCoach() {
    const router = useRouter()

    return (
        <div className="how-it-work">
            <div className="container">
                <h1 className="text-center">Multiple Ways to Find Your Ideal Coaches</h1>
                <div className="row how-it-work-inner-part">
                    <div className="col-md-4" onClick={() => router.push('/coach-detail/list')}>
                        <div className="card">
                            <div className="card-body">
                                <h1>01</h1>
                                <h5 className="card-title">Manual Search</h5>
                                <span>Browse with Filters</span>
                                <p className="card-text">Use standard filters like category, location,
                                    budget, and language to find coaches manually at your own pace.</p>
                            </div>
                            <div className="btn_hiw">
                                <Link href="/coach-detail/list">Try Now <EastIcon className="find_icons" /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4" onClick={() => router.push('/send-coaching-request')}>
                        <div className="card two">
                            <div className="card-body">
                                <h1>02</h1>
                                <h5 className="card-title">Send a Coaching Request</h5>
                                <span>Let Coaches Come to You</span>
                                <p className="card-text">
                                    Describe your coaching need and we’ll notify all qualified coaches.
                                    Those interested will reach out to you directly.</p>
                            </div>
                            <div className="btn_hiw">
                                <Link href="/send-coaching-request">Try Now <EastIcon className="find_icons" /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h1>03</h1>
                                <h5 className="card-title">Smart AI Matching</h5>
                                <span>Let AI Recommend Your Fit</span>
                                <p className="card-text">Share your goal, availability, and preferences — our AI will
                                    suggest the most suitable coaches for you in seconds.</p>
                            </div>
                            <div className="btn_hiw">
                                <a href="#">Try Now <EastIcon className="find_icons" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}