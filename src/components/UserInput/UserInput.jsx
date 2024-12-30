import styles from './UserInput.module.css';
import {AudioInputIcon, AudioOutputIcon, FileInputIcon, PromptSelectorIcon} from './Icons';

function UserInput() {
  return (
    <div className={styles.userInput}>
      <input className={styles.userKeyboard} type="text" placeholder="send message" />
      <div className={styles.userInputIcons}>
        <AudioInputIcon/>
        <AudioOutputIcon/>
        <FileInputIcon/>
        <PromptSelectorIcon/>
      </div>
    </div>
  )
}

export default UserInput;