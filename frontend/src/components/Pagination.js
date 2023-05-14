function Pagination(props) {
    const { count, pageSize, currentPage, onChange } = props;
    const pageCount = Math.ceil(count / pageSize);
  
    const handlePageClick = (page) => {
      if (page >= 1 && page <= pageCount) {
        onChange(page);
      }
    };
  
    const renderPageLinks = () => {
      const pageLinks = [];
  
      for (let i = 1; i <= pageCount; i++) {
        const isCurrentPage = i === currentPage;
        pageLinks.push(
          <li key={i}>
            <button
              className={isCurrentPage ? 'current-page' : ''}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
  
      return pageLinks;
    };
  
    return (
      <ul className="pagination">
        {renderPageLinks()}
      </ul>
    );
  }
export default DeleteDonorConfirmation;