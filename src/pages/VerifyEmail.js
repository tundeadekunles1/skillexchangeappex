import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState(""); // To store email for resend functionality

  useEffect(() => {
    window.scrollTo(0, 0); // Auto-scroll to top

    const verify = async () => {
      // Validate token format first
      if (!token || token.length !== 8) {
        setMsg("Invalid verification link");
        setLoading(false);
        return;
      }

      const baseURL = process.env.REACT_APP_API_BASE_URL;
      try {
        const res = await axios.get(`${baseURL}/auth/verify-email/${token}`);
        const jwtToken = res.data.token;
        const userEmail = res.data.user.email;

        localStorage.setItem("token", jwtToken);
        setEmail(userEmail);
        setMsg("Verification successful! Redirecting...");
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          "Verification failed. The link may be invalid or expired.";

        setMsg(errorMsg);

        // Store email if available in error response
        if (err.response?.data?.email) {
          setEmail(err.response.data.email);
        }

        // Redirect if already verified
        if (err.response?.data?.message === "Email already verified") {
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate]);

  const handleResendVerification = async () => {
    if (!email) return;

    try {
      setLoading(true);
      const baseURL = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${baseURL}/resend-verification`, { email });
      setMsg(`New verification email sent to ${email}`);
    } catch (err) {
      setMsg(
        err.response?.data?.message || "Failed to resend verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Email Verification</h2>
      <p className={`message ${isSuccess ? "success" : "error"}`}>
        {loading ? "Verifying your email..." : msg}
      </p>

      {!loading && !isSuccess && (
        <div className="auth-actions">
          <button className="auth-button" onClick={() => navigate("/signin")}>
            Go to Sign In
          </button>

          {email && (
            <button
              className="auth-button secondary"
              onClick={handleResendVerification}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
