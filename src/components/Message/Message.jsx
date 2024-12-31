import styles from './Message.module.css';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function Message({ content }) {
  return (
    <div className={styles.message}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Message;