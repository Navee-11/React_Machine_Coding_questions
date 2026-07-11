import React from "react";

const Pagination = ({ products, page, setPage, maxVisiblePages = 5 }) => {
  let totalPages = Math.ceil(products.length / 10);
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== page &&
      selectedPage <= products.length / 10
    )
      setPage(selectedPage);
  };
  const renderPageKey = (currentPage, key) => {
    return (
      <span
        key={key}
        className={page === currentPage ? "pagination__selected" : ""}
        onClick={() => selectPageHandler(currentPage)}
      >
        {currentPage}
      </span>
    );
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i));
      }
    } else {
      // Truncation Logic
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        if (startPage > 2) pageNumbers.push(renderPageKey(1));
        pageNumbers.push(renderPageKey("...", "ellipsis-start"));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageKey(i));
      }
      if (endPage < totalPages) {
        pageNumbers.push(renderPageKey("...", "ellipsis - end"));
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderPageKey(totalPages));
        }
      }
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      {page > 1 && <span onClick={() => selectPageHandler(page - 1)}>◀️</span>}
      {/* {Array.from({ length: products.length / 10 }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))} */}

      {renderPageNumbers()}
      {page < products.length / 10 && (
        <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
      )}
    </div>
  );
};

export default Pagination;
