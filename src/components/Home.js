import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Subscribe to messages
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);

      // Show notification for new message
      if (messagesData.length > 0 && messagesData[0].uid !== user?.uid) {
        const latestMessage = messagesData[0];
        setNotification({
          username: latestMessage.username,
          text: latestMessage.text,
        });

        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    });

    return () => unsubscribe();
  }, [navigate, user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        username: user?.name || 'Anonymous',
        uid: user?.uid,
        createdAt: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <div className="container">
      <div className="message-container">
        <h2>Messages</h2>
        <form className="message-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-item">
              <div className="message-header">
                <span className="message-username">{msg.username}</span>
                <span className="message-time">
                  {msg.createdAt && new Date(msg.createdAt.toDate()).toLocaleString()}
                </span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>

      {notification && (
        <div className="notification">
          <strong>{notification.username}</strong>: {notification.text}
        </div>
      )}
    </div>
  );
};

export default Home;