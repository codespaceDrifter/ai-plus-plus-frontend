import styles from './UserInput.module.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { AudioInputIcon, AudioOutputIcon, FileInputIcon, PromptSelectorIcon } from '../Icon/iconPaths';

function UserInput({ onSubmit ,setAudioOutput}) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const content = textareaRef.current.value.trim();
      if (content) {
        onSubmit(content);
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
        <Icon IconSVG={AudioInputIcon}/>
        <Icon IconSVG={AudioOutputIcon} onClick={setAudioOutput}/>
        <Icon IconSVG={FileInputIcon}/>
        <Icon IconSVG={PromptSelectorIcon}/>
      </div>
    </div>
  );
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setAudioOutput: PropTypes.func.isRequired
};

export default UserInput;