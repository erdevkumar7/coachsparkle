'use client';

import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function ProfileError() {
    return (
        <div className="container mt-5">
            <h3>User session expired or unauthorized.</h3>
            <p>Please <a href={`${FRONTEND_BASE_URL}/login`}>login</a> again.</p>
        </div>
    );
}