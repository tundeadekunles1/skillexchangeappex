import "../../styles/chat.css";

export default function ChatHeader({ chatPartner, skill }) {
  if (!chatPartner) return null;
  return (
    <div className="chat-header">
      <img
        src={chatPartner.avatar}
        alt={`${chatPartner.fullName}'s avatar`}
        className="avatar"
      />
      <div className="header-info">
        <h3>Chat with {chatPartner.fullName}</h3>
        <p className="skill-info">About: {skill}</p>
        <p className="status">{chatPartner.online ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
}
