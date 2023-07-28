import { useState } from 'react';

interface PaginationResult<T> {
  currentPage: number;
  paginatedData: T[];
  totalPages: number;
  setPage: (page: number) => void;
}

function usePagination<T>(data: T[], initialPage = 1, itemsPerPage = 20): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate the first and last index for the current page
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = currentPage * itemsPerPage;

  // Slice the data array to get the paginated result
  const paginatedData = data.slice(firstIndex, lastIndex);

  // Calculate the total number of pages based on the itemsPerPage
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to handle changing the current page
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    paginatedData,
    totalPages,
    setPage,
  };
}

export default usePagination;
