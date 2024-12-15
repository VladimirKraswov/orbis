import PropTypes from 'prop-types';
import Box from '../Box';
import { styles } from './styles';
import './styles.css';

const Table = ({ columns, data, onRowClick }) => (
  <Box fullWidth style={styles.container}>
    <table style={styles.table}>
      <thead>
        <tr style={styles.headerRow}>
          {columns.map((col, index) => (
            <th key={index} style={styles.header}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
  {data.map((row, rowIndex) => (
    <tr
      key={rowIndex}
      className="table-row"
      style={styles.row}
      onClick={() => onRowClick && onRowClick(row[0]?.props?.children || row, rowIndex)}
    >
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} style={styles.cell}>
          {cell}
        </td>
      ))}
    </tr>
  ))}
</tbody>

    </table>
  </Box>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  onRowClick: PropTypes.func,
};

Table.defaultProps = {
  onRowClick: null,
};

export default Table;
