import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "./ChatContainer";
import { useState } from "react";
import api from "../../utils/api";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  async function onSubmit(core) {
    setMessages(prev => [...prev, { core, isUser: true }]);
    await api.post("/messages", { core });
    const response = await api.get("/messages");
    setMessages(prev => [...prev, { core: response.data.core, isUser: false }]);
    console.log(response.data.core);
  };

  return (
    <>
      <PageNav/>
      <ChatContainer messages={messages}/>
      <UserInput onSubmit={onSubmit}/>
    </>
  );
};

export default ChatPage;
