import StartClassButton from "../components/StartClassButton";
import dayjs from "dayjs";

export default function SessionModal({ session, onClose }) {
  return (
    <div className="modal">
      <h3>Session on {dayjs(session.date).format("MMMM D, YYYY h:mm A")}</h3>
      <p>{session.notes}</p>

      <StartClassButton session={session} />

      <button onClick={onClose}>Close</button>
    </div>
  );
}
