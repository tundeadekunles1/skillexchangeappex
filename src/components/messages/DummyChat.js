export const currentUser = {
  id: "user1",
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=3",
  online: true,
};

export const chatPartner = {
  id: "user2",
  name: "Jane Smith",
  avatar: "https://i.pravatar.cc/150?img=5",
  online: true,
};

export const messages = [
  {
    id: 1,
    senderId: "user1",
    text: "Hey Jane, how are you doing today?",
    timestamp: "09:15 AM",
    read: true,
  },
  {
    id: 2,
    senderId: "user2",
    text: "Hi John! I'm doing great. How about you?",
    timestamp: "09:17 AM",
    read: true,
  },
  {
    id: 3,
    senderId: "user1",
    text: "Pretty good, thanks. Ready for our skill session later?",
    timestamp: "09:18 AM",
    read: false,
  },
  {
    id: 4,
    senderId: "user2",
    text: "Absolutely! I’ve been looking forward to it.",
    timestamp: "09:20 AM",
    read: false,
  },
];
