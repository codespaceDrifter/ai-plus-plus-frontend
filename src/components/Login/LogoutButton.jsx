import styles from './Button.module.css';

const LogoutButton = () => {

  return (  
    <button className={styles.button}>
      <p>Logout</p>
    </button>
  );
}

export default LogoutButton;