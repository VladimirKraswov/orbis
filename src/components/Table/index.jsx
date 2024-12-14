import { tableStyles } from './styles';

const Table = ({ columns, data }) => {
  return (
    <div style={tableStyles.container}> {/* Wrap table for scrollable content */}
      <table style={tableStyles.table}>
        <thead style={tableStyles.headerContainer}> {/* Sticky header */}
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={tableStyles.header}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tableStyles.body}>
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
    </div>
  );
};

export default Table;