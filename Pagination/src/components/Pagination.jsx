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
  const renderPageKey = (currentPage) => {
    return (
      <span
        key={currentPage}
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
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2)); //startPage is the first page number to display, calculated based on the current page and the maximum number of visible pages. It ensures that the pagination starts from a valid page number, not less than 1.
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); //endPage is the last page number to display, calculated based on the startPage and the maximum number of visible pages. It ensures that the pagination does not exceed the total number of pages available.

      // Adjust startPage if endPage is at the maximum limit
      if (startPage > 1) {
        if (startPage > 2) pageNumbers.push(renderPageKey(1));
        pageNumbers.push(renderPageKey("...", "ellipsis-start"));
      }

      // Render the page numbers between startPage and endPage
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageKey(i));
      }
      // Render ellipsis and last page if endPage is less than totalPages
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

      {renderPageNumbers()}

      {page < products.length / 10 && (
        <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
      )}
    </div>
  );
};

export default Pagination;
