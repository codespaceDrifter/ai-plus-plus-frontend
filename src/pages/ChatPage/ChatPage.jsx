import PageNav from "../../components/PageNav/PageNav";
import UserInput from "../../components/UserInput/UserInput";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import ChatNav from "../../components/ChatNav/ChatNav";
import { useAuth } from "react-oidc-context";
import { useChatFunctions } from "./ChatPageHook";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const auth = useAuth();
  const {
    messages,
    currentChatId,
    toggleAudioOutput,
    handleChatSelect,
    onSubmit,
    chats,
    createNewChat,
    deleteChat
  } = useChatFunctions(auth);

  return (
    <div className={styles.chatPageLayout}>
      <PageNav />
      <ChatNav 
        onSelectChat={handleChatSelect} 
        chats={chats} 
        activeChat={currentChatId} 
        onCreateNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />
      <ChatContainer messages={messages} />
      <UserInput 
        onSubmit={onSubmit} 
        setAudioOutput={toggleAudioOutput} 
        currentChatId={currentChatId}
      />
    </div>
  );
};

export default ChatPage;
