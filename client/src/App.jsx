/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginatedItems from './Paginate';

function App() {
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:3001/api/excel/upload?query=${searchQuery}`, {
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
      <div style={{border:"1px solid #000", padding:"10px"}}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Excel</button>
      </div>
      <PaginatedItems itemsPerPage={5} leads={leads} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>
  );
}

export default App
