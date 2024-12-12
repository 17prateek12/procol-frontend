import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function CreateEvents() {

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const authToken = Cookies.get('authToken');
  const userId = Cookies.get('userId');


  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [columns, setColumns] = useState(["Item Name", "Item Quantity"]);
  const [rows, setRows] = useState([]);
  const [newItem, setNewItem] = useState({
    itemName: '',
    itemQuantity: ''
  });
  const [description, setDescription] = useState([]);
  const [eventName, setEventName] = useState('');

  const navigate = useNavigate();

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleColumnAdd = () => {
    const newColumn = `Col ${columns.length + 1}`;
    setColumns([...columns, newColumn]);

    setNewItem((prevItem) => ({
      ...prevItem,
      [newColumn.toLowerCase().replace(" ", "")]: '', // Add the new column to newItem state
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value, // Update the corresponding field
    }));
  };

  const handleColumnDelete = (colIndex) => {
    const updatedColumns = columns.filter((_, index) => index !== colIndex);
    const updatedRows = rows.map(row => row.filter((_, index) => index !== colIndex));
    setColumns(updatedColumns);
    setRows(updatedRows);
  };


  const createEvent = async () => {
    if (!authToken) {
      console.error('No token found, user might not be logged in.');
      return;
    }

    const formattedStartTime = new Date(`${new Date().toISOString().split('T')[0]}T${startTime}`);
    const formattedEndTime = new Date(`${new Date().toISOString().split('T')[0]}T${endTime}`);
  
    const eventData = {
      eventName,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      createdBy: userId,
      description:description,
      items: rows.map((row) => {
        const itemName = row["itemname"]; // Adjust key based on normalized name
        const quantity = row["itemquantity"];
        const dynamicFields = { ...row };
  
        delete dynamicFields.itemname; // Remove fixed fields
        delete dynamicFields.itemquantity;
  
        return {
          itemName,
          quantity,
          dynamicFields,
        };
      }),
    };
  
    try {
      const response = await axios.post(`${API_URL}/api/event/event-create`, eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Event created successfully:", response.data);
      navigate("/home/event-table");
    } catch (error) {
      console.error("Error creating event: ", error.response.data);
    }
  };


  const handleRowAdd = () => {
    // Create a new row object based on columns
    const newRow = columns.reduce((row, col) => {
      const key = col.toLowerCase().replace(" ", ""); // Normalize column names
      row[key] = newItem[key] || ''; // Use existing value or empty string
      return row;
    }, {});

    // Add the new row to the table
    setRows([...rows, newRow]);

    // Reset the newItem state to clear input fields
    setNewItem({});
  };

  const handleCellEdit = (rowIndex, colKey, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [colKey]: value, // Update the specific field
    };
    setRows(updatedRows);
  };
  



  const handleColumnEdit = (index, event) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = event.target.value;
    setColumns(updatedColumns);
  };

  const handleRowDelete = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length > 0) {
        const headers = jsonData[0]; // First row as headers
        const rows = jsonData.slice(1).map(row =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index] || '';
            return acc;
          }, {})
        );

        setColumns(headers);
        setRows(rows);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    if (!eventName || !startTime || !endTime || rows.length === 0) {
      alert('Please fill out all required fields and add at least one item.');
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      alert('Start time must be earlier than end time.');
      return;
    }

    createEvent();
  };





  return (
    <>
      <div className='border-2'>
        <div className='flex flex-col p-2 items-center'>
          <div className='flex justify-center mb-4 flex-col'>
            <div className='w-full'>
              <input
                className='w-full p-2 border-2 rounded-xl '
                placeholder='Event Name'
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <input
              type="time"
              className="p-2 w-full rounded-xl mx-2 border-2"
              value={startTime}
              onChange={handleStartTimeChange}
              placeholder="Start Time"
            />
            <input
              type="time"
              className="p-2 border-2 w-full mx-2 rounded-xl"
              value={endTime}
              onChange={handleEndTimeChange}
              placeholder="End Time"
            />
          </div>
          <input
            type="text"
            className="p-2 border-2 w-[70%] flex rounded py-4"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div className='p-2'>
          <div className='flex flex-col items-center mb-4'>
            {columns.map((col, index) => (
              <div key={index} className="flex flex-row mb-2">
                <input
                  name={col.toLowerCase().replace(" ", "")}
                  value={newItem[col.toLowerCase().replace(" ", "")] || ''}
                  onChange={handleInputChange}
                  placeholder={col}
                  className="p-2 border-2 rounded-xl"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleRowAdd}
            className="p-2 bg-black text-white mb-4 rounded-md mx-4"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={handleColumnAdd}
            className="p-2 bg-black text-white rounded-md"
          >
            Add More Columns
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type="button"
            onClick={handleSubmit}
            className='p-2 bg-black text-white rounded-md'
          >
            Submit
          </button>
          <label className='p-2 ml-2 bg-black text-white rounded-md cursor-pointer'>
            Upload Excel
            <input
              type='file'
              accept='.xlsx, .xls'
              onChange={handleExcelUpload}
              className='hidden'
            />
          </label>
        </div>
      </div>

      <div className='max-w-[1000px] max-h-[1000px] overflow-scroll'>
        <table className='border-collapse border-2 w-full mt-4'>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className='border-2 p-2'>
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => handleColumnEdit(index, e)}
                    className="p-2 border-2 rounded-xl"
                  />
                  {index >= 2 && (
                    <button
                      type="button"
                      onClick={() => handleColumnDelete(index)}
                      className="ml-2 bg-red-500 text-white p-1 rounded-md"
                    >
                      Delete
                    </button>
                  )}
                </th>
              ))}
              <th className='border-2 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const key = col.toLowerCase().replace(" ", "");
                  return (
                    <td key={colIndex} className="border-2 p-2">
                      <input
                        type="text"
                        value={row[key] || ''}
                        onChange={(e) => handleCellEdit(rowIndex, key, e.target.value)}
                        className="p-2 border-2 rounded-xl"
                      />
                    </td>
                  );
                })}
                <td className="border-2 p-2">
                  <button
                    type="button"
                    onClick={() => handleRowDelete(rowIndex)}
                    className="p-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreateEvents;