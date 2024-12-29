import {Link} from 'react-router-dom';
import styles from './PageNav.module.css'

function PageNav(){
    return (
        <nav className={styles.Nav}>
            <Link className={styles.pageLink} to = "/">Home</Link>
            <Link className = {styles.pageLink} to = "/chat">Chat</Link>
        </nav>
    )
}

export default PageNav;