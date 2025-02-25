import PropTypes from 'prop-types';
import styles from './ChatNav.module.css';

function ChatNav({ onSelectChat, chats, activeChat, onCreateNewChat }) {
  return (
    <div className={styles.chatNav}>
      <button className={styles.newChatButton} onClick={onCreateNewChat}>
        New Chat
      </button>
      
      <div className={styles.chatList}>
        {chats.map((chat) => (
          <div 
            key={chat.id}
            className={`${styles.chatItem} ${activeChat === chat.id ? styles.activeChat : ''}`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </div>
        ))}
      </div>
    </div>
  );
}

ChatNav.propTypes = {
  onSelectChat: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
  activeChat: PropTypes.number,
  onCreateNewChat: PropTypes.func.isRequired
};

export default ChatNav;