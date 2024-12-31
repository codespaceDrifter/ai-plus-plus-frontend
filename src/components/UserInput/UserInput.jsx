import styles from './UserInput.module.css';
import {AudioInputIcon, AudioOutputIcon, FileInputIcon, PromptSelectorIcon} from './Icons';
import { useRef } from 'react';

function UserInput({ onSendMessage }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = textareaRef.current.value.trim();
      if (text) {
        onSendMessage(text);
        textareaRef.current.value = '';
        textareaRef.current.style.height = 'auto';
      }
    }
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

export default UserInput;