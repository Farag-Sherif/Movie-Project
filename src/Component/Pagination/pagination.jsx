
import ReactPaginate from 'react-paginate';
import './pagination.css';

export default function PaginatedItems({ pageCount , setCurrentPage }) {

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={null}
        onPageChange={(e)=>setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={null}
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-link"
        activeLinkClassName="active"
      />
    </>
  );
}
