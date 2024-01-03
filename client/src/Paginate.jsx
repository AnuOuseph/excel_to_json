/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css'

function Items({ currentItems}) {
  return (
    <>
        {currentItems &&(
        <div>
            <h3>Item</h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 border border-gray-300">
                        Name
                        </th>
                        <th scope="col" className="px-6 py-3 border border-gray-300">
                        Lead Source
                        </th>
                        <th scope="col" className="px-6 py-3 border border-gray-300">
                        Lead Assigned 
                        </th>
                        <th scope="col" className="px-6 py-3 border border-gray-300">
                        Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item)=>(      
                        <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 border" >{item?.name}</td>
                            <td className="px-6 py-4 border">{item?.country}</td>
                            <td className="px-6 py-4 border">{item?.number}</td>
                            <td className="px-6 py-4 border">{item?.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
    </>
  );
}

function PaginatedItems({ itemsPerPage ,leads}) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = leads.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(leads.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % leads.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} leads={leads}/>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems
