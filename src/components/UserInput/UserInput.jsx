import styles from './UserInput.module.css';
import {AudioInputIcon, AudioOutputIcon, FileInputIcon, PromptSelectorIcon} from './Icons';
import { useRef } from 'react';
import PropTypes from 'prop-types';

function UserInput({ onSubmit }) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const content = textareaRef.current.value.trim();
      if (content) {
        onSubmit(content, true);
        textareaRef.current.value = '';
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className={styles.userInput}>
      <textarea 
        ref={textareaRef}
        className={styles.userKeyboard} 
        placeholder="send message"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.userInputIcons}>
        <AudioInputIcon/>
        <AudioOutputIcon/>
        <FileInputIcon/>
        <PromptSelectorIcon/>
      </div>
    </div>
  );
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UserInput;