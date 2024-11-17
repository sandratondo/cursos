import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    let buttons = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    //Cálculo del rango de páginas 5
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4); // Si la primera página es 1, extenderá el rango hacia la derecha.
      } else {
        startPage = Math.max(1, endPage - 4); // Si no empieza en 1, ajustará el rango para mostrar páginas a la izquierda.
      }
    }

    //Crea los botones
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 py-1 border ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    //Los botones de "Anterior" y "Siguiente"
    <div id="pagination-container" className="pagination flex justify-center my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-2 py-1 border ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500'} rounded-md mx-1`}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {getPaginationButtons()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-2 py-1 border ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500'} rounded-md mx-1`}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
