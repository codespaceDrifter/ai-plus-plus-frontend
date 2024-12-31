import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "./ChatContainer";
import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (text) => {
    setMessages(prev => [...prev, { text, isUser: true }]);
  };

  return (
    <>
      <PageNav/>
      <ChatContainer messages={messages}/>
      <UserInput onSendMessage={handleNewMessage}/>
    </>
  );
};

export default ChatPage;
