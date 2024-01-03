/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PaginatedItems from './Paginate';


function App() {
  const [file, setFile] = useState(null);
  const [leads,setLeads] = useState([])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    const apiPromises = [
      axios.get("http://localhost:3001/api/excel/getDetails"),
    ];
    Promise.all(apiPromises).then((responses) => {
      const [
        leadsData,
      ] = responses;
      setLeads(leadsData?.data?.leads);
    });
  }, []);
  console.log(leads)

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/excel/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
      <p>table</p>
      <PaginatedItems itemsPerPage={5} leads={leads}/>
      {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              {leads.map((item)=>(      
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
      </table> */}
    </div>
  );
}

export default App
