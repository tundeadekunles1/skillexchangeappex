import { useState } from "react";
import "../../styles/chat.css";

export default function MessageBubble({
  message,
  isOwnMessage,
  showHeader,
  isLastInGroup,
}) {
  const [imageError, setImageError] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  const isImageAttachment = message.attachmentUrl?.match(
    /\.(jpeg|jpg|gif|png)$/i
  );
  // const isOtherAttachment = message.attachmentUrl && !isImageAttachment;

  const handleImageClick = () => {
    if (isImageAttachment) setExpandedImage(message.attachmentUrl);
  };

  const renderAttachment = () => {
    if (!message.attachmentUrl) return null;

    if (imageError && isImageAttachment) {
      return (
        <div className="attachment-error">
          Failed to load image
          <a
            href={message.attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="attachment-link"
          >
            (Open directly)
          </a>
        </div>
      );
    }

    if (isImageAttachment) {
      return (
        <div className="image-attachment" onClick={handleImageClick}>
          <img
            src={message.attachmentUrl}
            alt="Attachment"
            onError={() => setImageError(true)}
            className="attachment-image"
          />
          <span className="image-hover-text">Click to enlarge</span>
        </div>
      );
    }

    return (
      <div className="file-attachment">
        <a
          href={message.attachmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="attachment-link"
        >
          <span className="attachment-icon">📎</span>
          Open attachment
        </a>
      </div>
    );
  };

  return (
    <>
      <div className={`message-bubble ${isOwnMessage ? "own" : ""}`}>
        {showHeader && !isOwnMessage && (
          <div className="sender-name">{message.senderName}</div>
        )}
        {message.text && <div className="text">{message.text}</div>}
        {renderAttachment()}
        <div className="message-metadata">
          <span className="timestamp">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isOwnMessage && (
            <span className="status-icon">
              {message.read ? "✓✓" : message.isOptimistic ? "🕒" : "✓"}
            </span>
          )}
        </div>
      </div>

      {expandedImage && (
        <div className="image-modal" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} alt="Expanded attachment" />
        </div>
      )}
    </>
  );
}
