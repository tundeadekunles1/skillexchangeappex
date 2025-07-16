import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "../../styles/chat.css";

export default function ChatWindow({
  currentUser,
  chatPartner,
  messages,
  onSend,
  skill,
}) {
  return (
    <div className="chat-window">
      <ChatHeader chatPartner={chatPartner} skill={skill} />
      <MessageList
        messages={messages}
        currentUserId={currentUser.userId}
        isEmpty={messages.length === 0}
      />
      <ChatInput onSend={onSend} />
    </div>
  );
}
