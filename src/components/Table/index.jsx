import { tableStyles } from './styles';

const Table = ({ columns, data }) => {
  return (
    <table style={tableStyles.table}>
      <thead>
        <tr>
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
  );
};

export default Table;
