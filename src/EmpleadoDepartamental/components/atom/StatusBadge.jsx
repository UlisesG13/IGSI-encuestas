const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase()) {
        case 'habilitada':
          return 'bg-green-100 text-green-800';
        case 'deshabilitada':
          return 'bg-red-100 text-red-800';
        case 'borrador':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(status)}`}>
        {status}
      </span>
    );
  };

export default StatusBadge;