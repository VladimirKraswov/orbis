import { styles } from './styles'

const Block = ({ title, children }) => (
  <div style={styles.container}>
    <h2 style={styles.header}>{title}</h2>
    {children}
  </div>
);

export default Block;
