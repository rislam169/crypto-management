import React from 'react';
import './Pagination.css';

const Pagination = (props) => {
    const { page, totalPages, handlePaginationClick } = props;

    return (
        <div className="Pagination">
            <button className="Pagination-button" disabled={page === 1 ? 'disabled' : ''} onClick={() => handlePaginationClick('prev')}>&larr;</button>
            <span className="Pagination-info">page {page} of {totalPages}</span>
            <button className="Pagination-button" disabled={page === totalPages ? 'disabled' : ''} onClick={() => handlePaginationClick('next')}>&rarr;</button>
        </div>
    )
}

export default Pagination;