import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "./ChatContainer";
import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const onSubmit = (content, isUser) => {
    setMessages(prev => [...prev, { content, isUser }]);
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
