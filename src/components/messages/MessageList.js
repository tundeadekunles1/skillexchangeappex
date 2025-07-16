import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import "../../styles/chat.css";

export default function MessageList({ messages, currentUserId, isEmpty }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const groupedMessages = messages.reduce((acc, message, index) => {
    const prevMessage = messages[index - 1];
    const shouldGroup =
      prevMessage &&
      prevMessage.senderId === message.senderId &&
      new Date(message.createdAt) - new Date(prevMessage.createdAt) <
        5 * 60 * 1000;

    if (shouldGroup) {
      const lastGroup = acc[acc.length - 1];
      lastGroup.messages.push(message);
    } else {
      acc.push({
        senderId: message.senderId,
        messages: [message],
        isOwn: message.senderId === currentUserId,
        timestamp: message.createdAt,
      });
    }
    return acc;
  }, []);

  if (isEmpty) {
    return (
      <div className="empty-chat">
        <p>No messages yet. Say hello! 👋</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {groupedMessages.map((group, groupIndex) => (
        <div
          key={`group-${groupIndex}`}
          className={`message-group ${group.isOwn ? "own" : ""}`}
        >
          {group.messages.map((message, msgIndex) => (
            <MessageBubble
              key={message._id || message.tempId}
              message={message}
              isOwnMessage={group.isOwn}
              showHeader={msgIndex === 0}
              isLastInGroup={msgIndex === group.messages.length - 1}
            />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
