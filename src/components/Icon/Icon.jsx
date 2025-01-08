import { useState } from 'react';
import styles from './Icon.module.css';
import PropTypes from 'prop-types';

function Icon({IconSVG, onClick}) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) onClick();
  };

  return (
    <div className={styles.iconContainer} onClick={handleClick}>
        <IconSVG className={isActive ? styles.active: styles.inactive}/>
    </div>
  );
}

Icon.propTypes = {
  IconSVG: PropTypes.elementType.isRequired,
  onClick: PropTypes.func
};

export default Icon;
