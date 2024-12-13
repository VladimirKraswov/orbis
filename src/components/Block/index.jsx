import { styles } from './styles'

const Block = ({ title, children, headerElements }) => (
  <div style={styles.container}>
    <div style={styles.backgroundOverlay}></div>
    <div style={styles.header}>
      <span>{title}</span>
      {headerElements && <div>{headerElements}</div>}
    </div>
    <div style={styles.content}>{children}</div>
  </div>
);

Block.defaultProps = {
  headerElements: null,
};

export default Block;
