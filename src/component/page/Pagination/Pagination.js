import React from "react";
import { Pagination } from "react-bootstrap";

const Postpagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const items = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        items.push(
      <Pagination.Item  onClick={() => paginate(i)} className="pagination-list" key={i} active={i === currentPage}>
      {i}
    </Pagination.Item>
    );
  }
  
  // items.splice(`${currentPage >=  12 ? currentPage - 11 : currentPage + 3}`,9, <Pagination.Ellipsis className="pagination-list" />)


  
  if (currentPage > Math.ceil(Math.ceil(totalPosts / postsPerPage) * 25 / 100) && currentPage < Math.ceil(Math.ceil(totalPosts / postsPerPage) * 78 / 100)) {
    items.splice(1,Math.ceil(Math.ceil(totalPosts / postsPerPage) * 20 / 100), <Pagination.Ellipsis className="pagination-list" />)
    
    items.splice(Math.ceil(Math.ceil(totalPosts / postsPerPage) * 65 / 100) , Math.ceil(Math.ceil(totalPosts / postsPerPage) * 20 / 100), <Pagination.Ellipsis className="pagination-list" />)

  } else {

    items.splice(Math.ceil(Math.ceil(totalPosts / postsPerPage) * 30 / 100) , Math.ceil(Math.ceil(totalPosts / postsPerPage) * 40 / 100), <Pagination.Ellipsis className="pagination-list" />)
    
  }


  return (

    <Pagination>
      <Pagination.First onClick={() => paginate(1)} className={`pagination-list ${currentPage === 1 && 'disabled'} `}/>
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} className={`pagination-list ${currentPage === 1 && 'disabled'} `}/>
      {items}
      <Pagination.Next onClick={() => paginate(currentPage + 1)}  className={`pagination-list ${currentPage === totalPosts / postsPerPage && 'disabled'} `}/>
      <Pagination.Last onClick={() => paginate( Math.ceil(totalPosts / postsPerPage))} className={`pagination-list ${currentPage === totalPosts / postsPerPage && 'disabled'} `}/>
    </Pagination>
    // <nav>
    //   <ul className="pagination">
    //   <li class={`page-item ${currentPage === 1 && 'disabled'}`}>
    //     <p onClick={() => paginate(currentPage - 1)} class="page-link" aria-label="Previous" >
    //       <span aria-hidden="true">&laquo;</span>
    //       {/* <span class="sr-only">Previous</span> */}
    //     </p>
    //   </li>
    //     {pageNumber.map((number) => (
    //       <li key={number} className={`page-item ${number === currentPage && 'active'}`}>
    //         <p onClick={() => paginate(number)} className="page-link">{number}</p>
    //       </li>
    //     ))}
    //   <li class={`page-item ${currentPage === totalPosts / postsPerPage && 'disabled'}`}>
    //     <p onClick={() => paginate(currentPage + 1)} class="page-link"  aria-label="Next">
    //       <span aria-hidden="true">&raquo;</span>
    //       {/* <span class="sr-only">Next</span> */}
    //     </p>
    //   </li>
    //   </ul>
    // </nav>
  );
};
export default Postpagination;
