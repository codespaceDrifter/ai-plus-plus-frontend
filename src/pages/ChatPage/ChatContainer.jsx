import styles from './ChatPage.module.css';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';

function ChatContainer({messages}) {

    return (
        <>
            <div className={styles.chatContainer}>
                {messages.map((message, index) => (
                    <Message 
                        key={index}
                        content={message.content}
                        isUser={message.isUser}
                    />
                ))}
            </div>
        </>
    );
}

ChatContainer.propTypes = {
    messages: PropTypes.array.isRequired
};

export default ChatContainer;