import PropTypes from 'prop-types';
function AudioInputIcon({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  );
}

AudioInputIcon.propTypes = {
  className: PropTypes.string
};

function AudioOutputIcon({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/>
    </svg>
  );
}

AudioOutputIcon.propTypes = {
  className: PropTypes.string
};

function FileInputIcon({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M5 15l7-7 7 7h-4v4H9v-4z"/>
      <path d="M5 4v2h14V4H5z"/>
    </svg>
  );
}

FileInputIcon.propTypes = {
  className: PropTypes.string
};

function PromptSelectorIcon({className}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  );
}

PromptSelectorIcon.propTypes = {
  className: PropTypes.string
};

export { AudioInputIcon, AudioOutputIcon, FileInputIcon, PromptSelectorIcon };