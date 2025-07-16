import { useState } from "react";
import "../../styles/chat.css";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };
  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Type your message"
      />
      <button type="submit" disabled={!text.trim()}>
        Send
      </button>
    </form>
  );
}
