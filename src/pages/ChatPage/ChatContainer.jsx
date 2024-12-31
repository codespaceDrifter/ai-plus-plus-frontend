import styles from './ChatPage.module.css';
import Message from '../../components/Message/Message';

function ChatContainer({ messages = [] }){
    return (
        <div className={styles.chatContainer}>
            {messages.map((message, index) => (
                <Message 
                    key={index}
                    text={message.text}
                    isUser={message.isUser}
                />
            ))}
        </div>
    );
}

export default ChatContainer;