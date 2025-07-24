"use client";
import BreadCrumb from "@/components/BreadCrumb";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SendMessagePanel({sendMessage}) {
     const router = useRouter();
  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Coach Name", href: "#" },
    { label: "Message", href: "#" },
  ];

    useEffect(() => {
      const token = Cookies.get("token");
  if (!token) {
    router.push("/login?redirect=/send-message");
    return;
  }

      const validateUser = async () => {
        const tokenData = await HandleValidateToken(token);
        if (!tokenData) {
          Cookies.remove("token");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      };

      validateUser();
    }, []);
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="message-box-container d-flex justify-content-center align-items-center">
        <div className="message-box bg-white p-4 rounded-4 shadow-sm position-relative">
          <button
            type="button"
            className="btn-close position-absolute top-5 end-0 m-3"
            aria-label="Close"
          ></button>

          <h4 className="text-center fw-bold mb-4">MESSAGE</h4>
          <div className="d-flex justify-content-center">
            <div className="alert alert-info d-flex align-items-center gap-2 px-3 py-2">
              <i className="bi bi-info-circle-fill fs-5"></i>
              <div>
                <strong>Start a Conversation with Coach</strong>
                <br />
                Hi [Coach's Name], excited to connect! I’m looking for guidance
                on [specific area]. My biggest challenge is [briefly describe
                challenge]. How do you typically work with new clients, and
                which of your coaching packages might help?
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Subject</label>
            <input type="text" className="form-input px-4" name="subject" />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Your Inquiry</label>
            <textarea className="form-textarea px-4 py-3" rows="5"></textarea>
          </div>

          <div className="text-center mb-2">
            <button className="btn btn-primary">
              Send <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <p className="text-center text-muted small">
            Check and track your message status in your{" "}
            <a href="#" className="link">
              inbox
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
