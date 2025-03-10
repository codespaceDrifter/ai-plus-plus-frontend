import { useState, useEffect } from "react";
import api from "../../services/api";
import { tts } from "../../services/audioOutput";

/*
chat sturcture {int id, string name}
chats structure List(chat)
message structure {string core, bool is_user}
messages structure List(message)
*/

/*
api calls

GET /chats
  get all chats
POST /chats
  create a new chat
GET /chats/id
  get all messages for a chat
POST /messages/id
  send a message to a chat
GET /messages/id
  generate a response to a chat
*/

export const useChatFunctions = (auth) => {
  const [messages, setMessages] = useState([]);
  const [audioOutput, setAudioOutput] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);


  const toggleAudioOutput = () => {
    setAudioOutput(prev => !prev);
    tts.synthesis.cancel();
    tts.speak("voice toggled");
    console.log("toggled");
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!auth.isAuthenticated) return;
        const accessToken = auth.user?.access_token;
        const response = await api.get("/chats", {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setChats(response.data.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, [auth.isAuthenticated, auth.user?.access_token]);

  const createNewChat = async () => {
    try {
      if (!auth.isAuthenticated) return;
      const accessToken = auth.user?.access_token;
      const response = await api.post("/chats", 
        {},
        {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const newChatId = response.data.id;
      const newChat = {
        id: newChatId,
        name: `New Chat`
      };
      setChats([newChat, ...chats]);
      handleChatSelect(newChatId);
      return newChat;
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      if (!auth.isAuthenticated) return;
      const accessToken = auth.user?.access_token;
      await api.delete(`/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setChats(chats.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error); 
    }
  };

  const handleChatSelect = (chatId) => {
    if (chatId !== currentChatId) {
      setCurrentChatId(chatId);
      fetchChatMessages(chatId);
      console.log(`Selected chat: ${chatId}`);
    }
  };


  const fetchChatMessages = async (chatId) => {
    try {
      if (!auth.isAuthenticated) return;
      setMessages([]);
      const accessToken = auth.user?.access_token;
      const response = await api.get(`/chats/${chatId}`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const onSubmit = async (core) => {
    try {
      if (!auth.isAuthenticated || !currentChatId) return;

      const accessToken = auth.user?.access_token;
      setMessages(prev => [...prev, { core, is_user: true }]);
      await api.post(`/messages/${currentChatId}`, 
        { 
          core: core,
          is_user: true
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const response = await api.get(`/messages/${currentChatId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessages(prev => [...prev, { core: response.data.core, is_user: response.data.is_user }]);
      if (audioOutput === true) {
        tts.speak(response.data.core);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };

  return {
    messages,
    currentChatId,
    audioOutput,
    toggleAudioOutput,
    handleChatSelect,
    onSubmit,
    chats,
    createNewChat,
    deleteChat
  };
}; 