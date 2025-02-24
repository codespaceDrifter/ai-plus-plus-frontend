import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import { useState } from "react";
import api from "../../services/api";
import { tts } from "../../services/audioOutput";
import { useAuth } from "react-oidc-context";

const ChatPage = () => {
  const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [audioOutput, setAudioOutput] = useState(false);

  const toggleAudioOutput = () => {
    setAudioOutput(prev => !prev);
    tts.synthesis.cancel();
    tts.speak ("voice toggled");
    console.log("toggled");
  };

  async function onSubmit(core) {
    try {
      if (!auth.isAuthenticated) {
        console.error('User is not authenticated');
        return;
      }

      const accessToken = auth.user?.access_token;

      setMessages(prev => [...prev, { core, isUser: true }]);
      await api.post("/messages", 
        { core },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const response = await api.get("/messages",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessages(prev => [...prev, { core: response.data.core, isUser: false }]);
      if (audioOutput === true) {
        tts.speak(response.data.core);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  }


  return (
    <>
      <PageNav/>
      <ChatContainer messages={messages}/>
      <UserInput onSubmit={onSubmit} setAudioOutput={toggleAudioOutput}/>

    </>
  );
};

export default ChatPage;
