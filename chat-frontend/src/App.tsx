import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

interface Message {
  username: string;
  message: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [info, setInfo] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
      setTypingUser('');
    });

    socket.on('user-joined', (user: string) => {
      setInfo((prev) => [...prev, `${user} joined the chat`]);
      socket.emit('get-users');
    });

    socket.on('user-left', (user: string) => {
      setInfo((prev) => [...prev, `${user} left the chat`]);
      socket.emit('get-users');
    });

    socket.on('typing', (user: string) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 1500);
    });

    socket.on('users', (users: string[]) => setOnlineUsers(users));

    fetch('http://localhost:3000/chat/history')
      .then((res) => res.json())
      .then((history) => setMessages(history));

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = () => {
    if (!message) return;
    socket.emit('message', { username, message });
    setMessage('');
  };

  if (!username)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="bg-white shadow-xl p-8 rounded-lg w-96 text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Enter your name to join</h1>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setUsername(e.currentTarget.value);
                socket.emit('join', e.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-blue-600 mb-2">Chat as <span className="text-gray-800">{username}</span></h2>
        <p className="text-gray-500 text-sm mb-4">Online: <span className="font-medium">{onlineUsers.join(', ')}</span></p>
        
        <div className="h-96 overflow-y-auto bg-gray-50 border border-gray-200 rounded p-4 space-y-2 text-sm">
          {info.map((i, idx) => (
            <div key={idx} className="text-gray-400 italic">{i}</div>
          ))}
          {messages.map((msg, idx) => (
            <div key={idx}>
              <span className="font-semibold text-blue-600">{msg.username}:</span>{' '}
              <span className="text-gray-800">{msg.message}</span>
            </div>
          ))}
          {typingUser && (
            <div className="text-blue-500 italic animate-pulse">{typingUser} is typing...</div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              socket.emit('typing', username);
            }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
