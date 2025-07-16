import { useState, useEffect, useContext } from "react";
import "../styles/teachermatches.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const TeacherMatches = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [teacherRequests, setTeacherRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    try {
      const res = await axios.get(`${baseURL}/match/teacher-requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setTeacherRequests(res.data || []);
    } catch (error) {
      console.error("Failed to fetch teacher requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (matchRequestId) => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = process.env.REACT_APP_API_BASE_URL;

      await axios.put(
        `${baseURL}/match-requests/${matchRequestId}/approve`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        `${baseURL}/sessions/${matchRequestId}`,
        { matchRequestId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchRequests();
    } catch (err) {
      console.error("Error approving match and creating session:", err);
    }
  };

  const handleDecline = async (requestId) => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    try {
      await axios.delete(`${baseURL}/match/decline-request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setTeacherRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  const handleOpenChat = (request) => {
    // Check authentication using the correct property name
    if (!user?.userId) {
      // Changed from _id to userId
      console.error("User not authenticated - cannot open chat");
      return;
    }

    // Validate request object
    if (!request || !request._id || !request.teacherId || !request.learnerId) {
      console.error("Invalid request object", request);
      return;
    }

    // Determine if current user is the teacher or learner
    const isTeacher = user.userId === request.teacherId; // Changed from _id to userId
    const chatPartnerId = isTeacher ? request.learnerId : request.teacherId;

    // Navigate to chat
    navigate("/dashboard/messages/", {
      state: {
        chatPartnerId,
        matchRequestId: request._id,
        skill: request.skill,
        partnerName: isTeacher ? request.learnerName : request.teacherName,
      },
    });
  };

  return (
    <div className="teacher-matches-container">
      <h2 className="teacher-matches-title">Skill Session Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : Array.isArray(teacherRequests) && teacherRequests.length > 0 ? (
        teacherRequests.map((request) => (
          <div key={request._id} className="teacher-request-card">
            <div className="teacher-request-info">
              <h3>{request.fullName}</h3>
              <p>
                <strong>Skill Requested:</strong> {request.skill}
              </p>
              <p>{request.bio}</p>
            </div>

            {request.status === "approved" ? (
              <div className="approved-actions">
                <p className="approved-text">✅ Approved</p>
                <button
                  className="chat-button"
                  onClick={() => handleOpenChat(request)}
                >
                  💬 Message
                </button>
              </div>
            ) : (
              <div className="button-group">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="accept-button"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(request._id)}
                  className="decline-button"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No skill session requests at the moment.</p>
      )}
    </div>
  );
};

export default TeacherMatches;
