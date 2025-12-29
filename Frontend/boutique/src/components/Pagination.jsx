import React from 'react'
import { useSelector } from 'react-redux'

function Pagination({
  currentPage,
  onPageChange,
  aciveClass = 'bg-[#D4AF37] text-black border-[#D4AF37]',
  nextPageText = "Next",
  prevPageText = 'Prev',
  firstPageText = '1st',
  lastPageText = 'Last'
}) {

  // Pull all potential values from the product state
  const { products, productCount, resultsPerPage, totalPages: stateTotalPages } = useSelector(state => state.product || {});

  // FIX: Calculate totalPages if it's not explicitly provided by the backend
  const totalPages = stateTotalPages || Math.ceil(productCount / resultsPerPage) || 0;

  // Debugging: Check your browser console to see if these numbers exist
  console.log("Pagination Data:", { productCount, resultsPerPage, totalPages, currentPage });

  // Guard clause: Only hide if there is truly only 1 page or no products
  if (!products || products.length === 0 || totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    let start = Math.max(1, currentPage - pageWindow);
    let end = Math.min(totalPages, currentPage + pageWindow);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers;
  }

  const baseBtnStyle = "px-3 py-1 border border-[#6D1A36] rounded hover:bg-[#D4AF37] hover:text-black transition text-white mx-1 min-w-[40px]";

  return (
    <div className="flex justify-center items-center mt-10 gap-2 pb-10 w-full">
      {/* First and Prev buttons */}
      <div className="flex gap-1">
        {currentPage > 1 && (
          <>
            <button className={baseBtnStyle} onClick={() => onPageChange(1)}>
                {firstPageText}
            </button>
            <button className={baseBtnStyle} onClick={() => onPageChange(currentPage - 1)}>
                {prevPageText}
            </button>
          </>
        )}
      </div>

      {/* Display Page Numbers */}
      <div className="flex gap-1 flex-wrap justify-center">
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={`${baseBtnStyle} ${currentPage === number ? aciveClass : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Next and Last buttons */}
      <div className="flex gap-1">
        {currentPage < totalPages && (
          <>
            <button className={baseBtnStyle} onClick={() => onPageChange(currentPage + 1)}>
                {nextPageText}
            </button>
            <button className={baseBtnStyle} onClick={() => onPageChange(totalPages)}>
                {lastPageText}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Pagination