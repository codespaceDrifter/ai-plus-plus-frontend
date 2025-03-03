import PropTypes from 'prop-types';
import styles from './ChatNav.module.css';

function ChatNav({ onSelectChat, chats, activeChat, onCreateNewChat }) {
  const handleTrashClick = (e, chatId) => {
    e.stopPropagation();
    console.log('Delete chat with ID:', chatId);
    // Future implementation: Delete chat functionality
  };

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
            <span className={styles.chatName}>{chat.name}</span>
            <div 
              className={styles.trashIconContainer}
              onClick={(e) => handleTrashClick(e, chat.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.trashIcon} fill="none" style={{
                backgroundColor: "var(--dark-component-gray)", }}>
                <path d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6H5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 4V2h4v2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
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