import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";
import ChatWindow from "../components/messages/ChatWindow";
import "../styles/chat.css";
import "../styles/messages.css";

function Messages() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const passedMatchRequestId = location.state?.matchRequestId || null;

  const [chatData, setChatData] = useState({
    teacher: null,
    learner: null,
    matchRequest: null,
    messages: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initializeChat = async () => {
      try {
        if (!user?.userId) {
          throw new Error("Please login to access messages.");
        }

        // 1. Fetch match request
        let matchRequest;
        if (passedMatchRequestId) {
          const res = await api.get(`/match-requests/${passedMatchRequestId}`);
          matchRequest = res.data.data;
        } else {
          const res = await api.get(`/match-requests/${user.userId}`);
          matchRequest = res.data.data;
        }

        if (!matchRequest) {
          throw new Error("No approved chat session found.");
        }

        // 2. Set up chat participants (no need to re-fetch partner details)
        setChatData({
          teacher: matchRequest.teacherId,
          learner: matchRequest.learnerId,
          matchRequest,
          messages: [],
          loading: false,
          error: null,
        });

        try {
          const msgRes = await api.get(`/messages/${matchRequest._id}`);
          setChatData((prev) => ({
            ...prev,
            messages: msgRes.data || [], // Ensure we always have an array
          }));
        } catch (msgErr) {
          if (msgErr.response?.status === 404) {
          } else {
            throw msgErr;
          }
        }
      } catch (err) {
        // Only navigate for critical errors (not for 404 messages)
        if (!err.response || err.response.status !== 404) {
          navigate("/dashboard", { state: { error: err.message } });
        }
      }
    };

    initializeChat();
  }, [user, navigate, passedMatchRequestId]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !chatData.matchRequest?._id) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: user.userId,
      matchRequestId: chatData.matchRequest._id,
      text,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    setChatData((prev) => ({
      ...prev,
      messages: [...prev.messages, optimisticMessage],
    }));

    try {
      const res = await api.post("/messages", {
        senderId: user.userId,
        matchRequestId: chatData.matchRequest._id,
        text,
      });

      setChatData((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      }));
    } catch (err) {
      console.error("Failed to send message:", err);
      setChatData((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg._id !== tempId),
      }));
    }
  };

  if (chatData.loading) {
    return (
      <div className="loading">
        <p>Initializing chat session...</p>
      </div>
    );
  }

  if (chatData.error) {
    return (
      <div className="error">
        <h3>Error Loading Chat</h3>
        <p>{chatData.error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="messages-container">
      <ChatWindow
        currentUser={user}
        chatPartner={
          String(user.userId) === String(chatData.teacher._id)
            ? chatData.learner
            : chatData.teacher
        }
        messages={chatData.messages}
        onSend={handleSendMessage}
        skill={chatData.matchRequest.skill}
      />
    </div>
  );
}

export default Messages;
