/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css'
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';


function Items({ currentItems,leads,searchQuery,setSearchQuery}) {

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  };
  const downloadPDF = (selectedKeys) => {
    const pdf = new jsPDF();
    const filteredData = leads.map(item =>
      selectedKeys.reduce((acc, key) => {
        acc[key] = item[key];
        return acc;
      }, {})
    );
    const columns = selectedKeys;
    const rows = filteredData.map(item => selectedKeys.map(key => item[key]));
    pdf.autoTable({
      head: [columns],
      startY: 20,
    });
    pdf.autoTable({
      head: [],
      body: rows,
      startY: 30,
    });
    pdf.save('data.pdf');
  };
  return (
    <>
        {currentItems &&(
        <div>
            <h3 className='py-2'>Data</h3>
            <button onClick={downloadExcel}>Download Excel</button>
            <button onClick={() => downloadPDF(['name', 'number', 'country','email'])}>Download PDF</button>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='border border-gray-500 px-2 rounded-sm text-sm py-1' placeholder='Search' />
            <button>Filter</button>
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

function PaginatedItems({ itemsPerPage ,leads,searchQuery,setSearchQuery}) {
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
      <Items currentItems={currentItems} leads={leads} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
