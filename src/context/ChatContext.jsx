import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    if (user) {
      // Load user's conversations from localStorage
      const storedConversations = localStorage.getItem(`conversations_${user.id}`);
      if (storedConversations) {
        try {
          setConversations(JSON.parse(storedConversations));
        } catch (error) {
          console.error('Error parsing stored conversations:', error);
        }
      }
    }
  }, [user]);

  const saveConversations = (newConversations) => {
    setConversations(newConversations);
    if (user) {
      localStorage.setItem(`conversations_${user.id}`, JSON.stringify(newConversations));
    }
  };

  const startConversation = (otherUserId, otherUserName, productId = null) => {
    if (!user) return null;

    const conversationId = [user.id, otherUserId].sort().join('_');

    const newConversations = { ...conversations };
    if (!newConversations[conversationId]) {
      newConversations[conversationId] = {
        id: conversationId,
        participants: [
          { id: user.id, name: user.name, avatar: user.avatar },
          { id: otherUserId, name: otherUserName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUserName}` }
        ],
        messages: [],
        productId,
        lastMessage: null,
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      };
    }

    saveConversations(newConversations);
    setActiveConversation(conversationId);
    return conversationId;
  };

  const sendMessage = (conversationId, content, messageType = 'text') => {
    if (!user || !conversations[conversationId]) return;

    const newMessage = {
      id: Date.now(),
      senderId: user.id,
      content,
      messageType,
      timestamp: new Date().toISOString(),
      read: false
    };

    const newConversations = { ...conversations };
    newConversations[conversationId].messages.push(newMessage);
    newConversations[conversationId].lastMessage = content;
    newConversations[conversationId].lastMessageTime = newMessage.timestamp;

    // Update unread count for other participants
    const otherParticipant = newConversations[conversationId].participants.find(p => p.id !== user.id);
    if (otherParticipant) {
      newConversations[conversationId].unreadCount += 1;
    }

    saveConversations(newConversations);
  };

  const markAsRead = (conversationId) => {
    if (!user || !conversations[conversationId]) return;

    const newConversations = { ...conversations };
    newConversations[conversationId].messages.forEach(message => {
      if (message.senderId !== user.id) {
        message.read = true;
      }
    });
    newConversations[conversationId].unreadCount = 0;

    saveConversations(newConversations);
  };

  const getConversations = () => {
    return Object.values(conversations).sort((a, b) =>
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
  };

  const getConversation = (conversationId) => {
    return conversations[conversationId] || null;
  };

  const getTotalUnreadCount = () => {
    return Object.values(conversations).reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const value = {
    conversations,
    activeConversation,
    setActiveConversation,
    startConversation,
    sendMessage,
    markAsRead,
    getConversations,
    getConversation,
    getTotalUnreadCount,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};