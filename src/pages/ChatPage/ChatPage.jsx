import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "./ChatContainer";
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

    const accessToken = await auth.getAccessToken();

    setMessages(prev => [...prev, { core, isUser: true }]);
    await api.post("/messages", 
      { headers: { Authorization: `Bearer ${accessToken}` } },
      { core }
    );

    console.log("AccessToken:", accessToken);

    const response = await api.get("/messages",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setMessages(prev => [...prev, { core: response.data.core, isUser: false }]);
    if (audioOutput === true) {
      tts.speak(response.data.core);
    }
  };


  return (
    <>
      <PageNav/>
      <ChatContainer messages={messages}/>
      <UserInput onSubmit={onSubmit} setAudioOutput={toggleAudioOutput}/>

    </>
  );
};

export default ChatPage;
