import styles from './Message.module.css';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function Message({ core, is_user }) {
  return (
    <div className={styles.message} data-is_user={is_user}>
      <ReactMarkdown className={styles.markDown}>{core}</ReactMarkdown>
    </div>
  );
}

Message.propTypes = {
  core: PropTypes.string.isRequired,
  is_user: PropTypes.bool.isRequired,
};

export default Message;