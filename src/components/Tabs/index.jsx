import { useState } from 'preact/hooks';
import PropTypes from 'prop-types';

const styles = {
    tabsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121212',
        color: '#ffffff',
        border: '1px solid #333',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    tabList: {
        display: 'flex',
        borderBottom: '1px solid #333',
        backgroundColor: '#1E1E1E',
    },
    tabButton: {
        flex: 1,
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#ccc',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'color 0.3s, background 0.3s',
    },
    activeTabButton: {
        color: '#ffffff',
        borderBottom: '2px solid #4CAF50',
    },
    tabContent: {
        padding: '20px',
        backgroundColor: '#181818',
        borderTop: '1px solid #333',
    },
};

/**
 * Tabs component to manage multiple Tab components.
 * Supports custom styles and class names for better flexibility.
 */
export const Tabs = ({ children, activeTab, onTabChange, className, style }) => {
    const [activeIndex, setActiveIndex] = useState(activeTab || 0);

    const handleTabClick = (index) => {
        setActiveIndex(index);
        if (onTabChange) onTabChange(index);
    };

    return (
        <div className={`${className}`} style={{ ...styles.tabsContainer, ...style }}>
            <div style={styles.tabList}>
                {children.map((child, index) => (
                    <button
                        key={index}
                        style={{
                            ...styles.tabButton,
                            ...(activeIndex === index ? styles.activeTabButton : {}),
                        }}
                        onClick={() => handleTabClick(index)}
                        title={child.props.title || child.props.label}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div style={styles.tabContent}>
                {children[activeIndex]}
            </div>
        </div>
    );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  style: PropTypes.object,
};

Tabs.defaultProps = {
  activeTab: 0,
  onTabChange: null,
  className: '',
  style: {},
};


/**
 * Tab component to be used inside Tabs.
 * Supports additional customization through class names and styles.
 */
export const Tab = ({ children, label, title, className, style }) => {
    return (
        <div className={className} style={style} title={title}>
            {children}
        </div>
    );
};

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired, // Label displayed in the tab header
    title: PropTypes.string, // Optional tooltip text for the tab
    className: PropTypes.string, // Optional custom class name for the tab content
    style: PropTypes.object, // Optional custom styles for the tab content
};

Tab.defaultProps = {
    title: '',
    className: '',
    style: {},
};
