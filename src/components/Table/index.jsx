import PropTypes from 'prop-types';
import Box from '../Box';
import { tableStyles } from './styles';

const Table = ({ columns, data }) => (
  <Box fullWidth style={tableStyles.container}>
    <table style={tableStyles.table}>
      <thead>
        <tr style={tableStyles.headerRow}>
          {columns.map((col, index) => (
            <th key={index} style={tableStyles.header}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} style={tableStyles.row}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={tableStyles.cell}>
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
};

export default Table;
