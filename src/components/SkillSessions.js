import { useEffect, useState, useContext } from "react";
import "../styles/skillsessions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SkillSession = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkillSessions();

    const interval = setInterval(() => {
      fetchSkillSessions(); // live polling every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const fetchSkillSessions = async () => {
    const token = localStorage.getItem("token");
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/match/my-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyRequests(res.data.requests);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch skill sessions:", error);
      setLoading(false);
    }
  };

  const handleStartLearning = (teacherId) => {
    console.log("Starting session with teacher:", teacherId);
    // navigate to video chat
  };

  const handleCancelRequest = async (requestId) => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    try {
      await axios.delete(`${baseURL}/match/cancel/${requestId}`, {
        withCredentials: true,
      });
      fetchSkillSessions(); // refresh list
    } catch (error) {
      console.error("Failed to cancel request:", error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const minutesAgo = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutesAgo < 1) return "just now";
    if (minutesAgo === 1) return "1 minute ago";
    return `${minutesAgo} minutes ago`;
  };

  const handleOpenChat = (request) => {
    // Check authentication
    if (!user?.userId) {
      console.error("User not authenticated - cannot open chat");
      return;
    }

    // Validate request object
    if (!request || !request._id || !request.teacherId || !request.learnerId) {
      console.error("Invalid request object", request);
      return;
    }

    // Check if request is approved
    if (request.status !== "approved") {
      alert("You can only message after the request is approved");
      return;
    }

    // Determine user role and partner info
    const isTeacher =
      String(user.userId) ===
      String(request.teacherId._id || request.teacherId);
    const partner = isTeacher ? request.learnerId : request.teacherId;

    // Navigate to chat
    navigate("/dashboard/messages/", {
      state: {
        matchRequestId: request._id,
        partnerInfo: {
          id: partner._id || partner,
          name: isTeacher
            ? request.learnerName || partner.fullName
            : request.teacherName || partner.fullName,
          profilePic: partner.profilePicUrl,
        },
        skill: request.skill,
      },
    });
  };

  return (
    <div className="skill-session-container">
      <h2> My Skill Sessions</h2>

      {loading ? (
        <p>Loading sessions...</p>
      ) : myRequests.length === 0 ? (
        <p>No active skill sessions yet.</p>
      ) : (
        myRequests.map((request) => (
          <div key={request._id} className="session-card">
            <h3>👩‍🏫 Teacher: {request.teacherId?.fullName || "Loading..."}</h3>
            <p>Skill: {request.skill || "Not specified"}</p>
            <p className={`status-text ${request.status}`}>
              Status: {request.status}
            </p>
            <p className="requested-time">
              Requested: {formatTimeAgo(request.createdAt)}
            </p>

            {request.status === "pending" ? (
              <>
                <p className="waiting-text">Waiting for teacher approval...</p>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelRequest(request._id)}
                >
                  Cancel Request
                </button>
              </>
            ) : request.status === "approved" ? (
              <>
                <button
                  className="start-learning-button"
                  onClick={() => navigate("/dashboard/sessions")}
                >
                  🚀 Start Learning
                </button>
                <button
                  className="chat-button"
                  onClick={() => handleOpenChat(request)}
                >
                  💬 Message
                </button>
              </>
            ) : (
              <p className="rejected-text">❌ Request rejected by teacher.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SkillSession;
