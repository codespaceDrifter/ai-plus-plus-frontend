import styles from './Message.module.css';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function Message({ core, isUser }) {
  return (
    <div className={styles.message} data-isuser={isUser}>
      <ReactMarkdown className={styles.markDown}>{core}</ReactMarkdown>
    </div>
  );
}

Message.propTypes = {
  core: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default Message;