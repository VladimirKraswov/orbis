import { useState } from 'preact/hooks';

const Switch = ({ onToggle }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    onToggle && onToggle(newState);
  };

  return <div className={`switch ${active ? 'active' : ''}`} onClick={handleClick}></div>;
};

export default Switch;
