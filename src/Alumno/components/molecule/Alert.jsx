
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

export default function Alert({ message, type = 'success', onAccept }) {
  const isSuccess = type === 'success' || type === 'info';
  return (
    <div className={`bg-black rounded-lg shadow-md p-5 m-4 max-w-md min-w-80 flex flex-col gap-2 relative ${
      isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center gap-2.5 font-bold text-lg">
        {isSuccess ? (
          <CheckCircle className="flex-shrink-0 mr-1" />
        ) : (
          <AlertTriangle className="flex-shrink-0 mr-1" />
        )}
        <span className="flex-1 font-semibold text-lg">{isSuccess ? 'Éxito' : 'Error'}</span>
        <button 
          className="bg-none border-none text-inherit cursor-pointer ml-2 text-lg hover:opacity-80" 
          onClick={onAccept}
        >
          <X size={18} />
        </button>
      </div>
      <div className="text-base my-1.5 mb-3">{message}</div>
      <div className="flex gap-2.5">
        <button 
          className={`bg-white text-gray-800 border-none rounded py-1.5 px-4.5 text-base font-medium cursor-pointer shadow-sm transition-colors duration-200 hover:bg-gray-100 ${
            isSuccess ? 'text-green-500' : 'text-red-500'
          }`} 
          onClick={onAccept}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
