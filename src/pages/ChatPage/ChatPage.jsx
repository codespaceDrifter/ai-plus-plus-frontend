import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "./ChatContainer";
import { useState } from "react";
import api from "../../utils/api";
import { tts } from "../../services/audioOutput";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [audioOutput, setAudioOutput] = useState(false);
  const toggleAudioOutput = () => {
    setAudioOutput(prev => !prev);
    tts.synthesis.cancel();
    tts.speak ("voice toggled");
    console.log("toggled");
  };

  async function onSubmit(core) {
    console.log (audioOutput);
    setMessages(prev => [...prev, { core, isUser: true }]);
    await api.post("/messages", { core });
    const response = await api.get("/messages");
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
