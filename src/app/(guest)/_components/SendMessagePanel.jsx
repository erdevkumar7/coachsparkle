"use client";
import BreadCrumb from "@/components/BreadCrumb";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendMessageSchema } from "@/lib/validationSchema";

export default function SendMessagePanel() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [coachId, setCoachId] = useState(null);
  const [errors, setErrors] = useState({});


  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Coach Name", href: "#" },
    { label: "Message", href: "#" },
  ];

  const token = Cookies.get("token");

  useEffect(() => {
    console.log("Checking token...");
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      router.push("/login?redirect=/send-message");
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

  const [formData, setFormData] = useState({
    subject: "",
    inquiry: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered.");
    console.log("coachId:", coachId);
    console.log("formData:", formData);

    // if (!coachId || !formData.subject || !formData.inquiry) {
    //   console.warn("Validation failed - missing fields.");
    //   alert("Please fill all required fields");
    //   return;
    // }

    await sendMessageSchema.validate(formData, { abortEarly: false});
    setErrors({});

    const data = {
      coach_id: parseInt(coachId),
      subject: formData.subject,
      your_inquiry: formData.inquiry,
    };

    try {
      console.log("Sending message to API:", `${apiUrl}/coachSendMessage`);
      console.log("Request body:", data);

      const resp = await fetch(`${apiUrl}/coachSendMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(data),
      });

      const json = await resp.json();

      console.log("API response:", json);

      if (!json.status) {
        console.error("API returned error:", json.message);
        alert("Failed to send message: " + json.message);
        return;
      }

      alert("Message sent successfully.");
      setFormData({ subject: "", inquiry: "" });
    } catch (err) {
  if (err.name === "ValidationError") {
    const errorObj = {};
    err.inner.forEach((e) => {
      errorObj[e.path] = e.message;
    });
    setErrors(errorObj);
  } else {
    alert("Something went wrong.");
    console.error(err);
  }
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

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Subject</label>
              <input
                type="text"
                className={`form-input px-4 ${errors.subject ? 'is-invalid' : ''}`}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
                {errors.subject && (
    <div className="text-danger mt-1 small">{errors.subject}</div>
  )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Your Inquiry</label>
              <textarea
                className={`form-textarea px-4 py-3 ${errors.inquiry ? 'is-invalid' : ''}`}
                rows="5"
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
              ></textarea>
              {errors.inquiry && (
    <div className="text-danger mt-1 small">{errors.inquiry}</div>
  )}
            </div>

            <div className="text-center mb-2">
              <button className="btn btn-primary">
                Send <i className="bi bi-arrow-right ms-1"></i>
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
    </>
  );
}
