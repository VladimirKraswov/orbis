import { styles } from './styles'

const Block = ({ title, children }) => (
  <div style={styles.container}>
    <h2 style={styles.header}>{title}</h2>
    <div style={styles.content}>
      {children}
    </div>
  </div>
);

export default Block;
