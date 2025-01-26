import styles from './Login.module.css';

import { useAuth } from "react-oidc-context";

function Login() {
  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <button onClick={() => auth.removeUser()} className={styles.button}>
        <p>Sign out</p>
      </button>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()} className={styles.button}>
        <p>Sign in</p>
      </button>
    </div>
  );
}
  
export default Login;