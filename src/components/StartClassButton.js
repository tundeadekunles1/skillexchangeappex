import dayjs from "dayjs";

export default function StartClassButton({ session }) {
  const now = dayjs();
  const sessionTime = dayjs(session.date);
  const canJoin =
    now.isAfter(sessionTime.subtract(10, "minute")) &&
    now.isBefore(sessionTime.add(2, "hour"));

  if (!canJoin) return <p>Class not yet available</p>;

  return (
    <a href={session.roomUrl} target="_blank" rel="noopener noreferrer">
      <button className="btn btn-primary">Start Class</button>
    </a>
  );
}
