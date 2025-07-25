"use client";
import BreadCrumb from "@/components/BreadCrumb";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMessageSchema } from "@/lib/validationSchema";
import { toast } from 'react-toastify';
import { CircularProgress } from "@mui/material";
import { ToastContainer } from 'react-toastify';

export default function SendMessagePanel() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [coachId, setCoachId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendMessageSchema),
    mode: "onBlur",
  });

    useEffect(() => {
    console.log("Checking token...");
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      router.push("/login?redirect=/send-message");
      toast.error("Login first")
      return;
    }

    const validateUser = async () => {
      console.log("Validating token...");
      const tokenData = await HandleValidateToken(token);
      if (!tokenData) {
        console.warn("Invalid token. Clearing cookies and redirecting.");
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        console.log("Token is valid.");
      }
    };

    validateUser();

    const id = localStorage.getItem("coach_id");
    if (id) {
      console.log("Loaded coach ID from localStorage:", id);
      setCoachId(id);
    } else {
      console.warn("No coach_id found in localStorage.");
    }
  }, []);

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Coach Name", href: "#" },
    { label: "Message", href: "#" },
  ];

  const onSubmit = async (data) => {
    if (!coachId) {
     toast.error("Coach ID not found.");
      return;
    }

setLoading(true);

    const payload = {
      coach_id: parseInt(coachId),
      subject: data.subject,
      your_inquiry: data.inquiry,
    };

    try {
      const resp = await fetch(`${apiUrl}/coachSendMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      const json = await resp.json();

      if (!json.status) {
        toast.error("Failed to send message: " + json.message);
        return;
      }
      console.log("API Response:", json);

console.log("✅ Toast success will fire");
      toast.success("Message sent successfully.");
      reset();
    } catch (err) {
      console.error("Unexpected error while sending message:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Subject</label>
              <input
                type="text"
                className={`form-input px-4 ${errors.subject ? "is-invalid" : ""}`}
                {...register("subject")}
                disabled={loading}
              />
              {errors.subject && (
                <div className="invalid-feedback d-block">
                  {errors.subject.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Your Inquiry</label>
              <textarea
                className={`form-textarea px-4 py-3 ${errors.inquiry ? "is-invalid" : ""}`}
                rows="5"
                {...register("inquiry")}
                disabled={loading}
              ></textarea>
              {errors.inquiry && (
                <div className="invalid-feedback d-block">
                  {errors.inquiry.message}
                </div>
              )}
            </div>

            <div className="text-center mb-2">
              <button className="btn btn-primary"  disabled={loading}>
                                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>
                    Send <i className="bi bi-arrow-right ms-1"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-muted small">
            Check and track your message status in your{" "}
            <a href="#" className="link">
              inbox
            </a>
            .
          </p>
        </div>
      </div>
              <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
