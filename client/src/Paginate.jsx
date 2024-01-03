/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import './App.css'

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems}) {
  return (
    <>
      {currentItems &&(
          <div>
            <h3>Item</h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="px-6 py-3">
              Name
              </th>
              <th scope="col" className="px-6 py-3">
              Lead Source
              </th>
              <th scope="col" className="px-6 py-3">
              Lead Assigned 
              </th>
              <th scope="col" className="px-6 py-3">
              Lead Stage
              </th>
              <th scope="col" className="px-6 py-3">
              Options
              </th>
          </tr>
          </thead>
          <tbody>
              {currentItems.map((item)=>(      
                  <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                      {item?.name}
                      </th>
                      <td className="px-6 py-4">{item?.country}</td>
                      <td className="px-6 py-4">{item?.number}</td>
                      <td className="px-6 py-4">{item?.source}</td>
                      <td className="px-6 py-4">{item?.email}</td>
                      <td className="px-6 py-4">
                      hy
                      </td>
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
    console.log("leadslko",leads)
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = leads.slice(itemOffset, endOffset);
  console.log("jbdyuguywt",currentItems,itemOffset,endOffset)
  const pageCount = Math.ceil(leads.length / itemsPerPage);
  console.log(pageCount)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % leads.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
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
