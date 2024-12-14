import PropTypes from 'prop-types';
import { styles } from './styles';

const FeatureContainer = ({ style = {}, title = '', scrollable = false, children, headerElements = null }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.backgroundOverlay} />
      <div style={styles.header}>
        <span>{title}</span>
        {headerElements && <div>{headerElements}</div>}
      </div>
      <div style={{ ...styles.content, overflow: scrollable ? 'auto' : 'hidden'} }>{children}</div>
    </div>
  );
};

FeatureContainer.defaultProps = {
  headerElements: null,
  style: {},
};

FeatureContainer.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  scrollable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  headerElements: PropTypes.node,
};

export default FeatureContainer;
