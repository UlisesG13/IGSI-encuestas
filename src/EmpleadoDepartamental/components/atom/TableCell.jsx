const TableCell = ({ children, className = "" }) => (
    <td className={`px-6 py-4 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
  
export default TableCell;