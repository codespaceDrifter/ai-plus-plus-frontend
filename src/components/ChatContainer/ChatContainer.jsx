import { useEffect, useRef } from 'react';
import styles from './ChatContainer.module.css';
import Message from '../Message/Message';
import PropTypes from 'prop-types';

function ChatContainer({messages}) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer} ref={containerRef}>
            {messages.map((message, index) => (
                <Message 
                    key={index}
                    {...message}
                />
            ))}
        </div>
    );
}

ChatContainer.propTypes = {
    messages: PropTypes.array.isRequired
};

export default ChatContainer;