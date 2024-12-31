import styles from './Message.module.css';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function Message({ content, isUser }) {
  return (
    <div className={styles.message} data-isuser={isUser}>
      <ReactMarkdown className={styles.markDown}>{content}</ReactMarkdown>
    </div>
  );
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default Message;