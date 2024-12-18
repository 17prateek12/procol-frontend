import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdDelete } from "react-icons/md";
import * as XLSX from 'xlsx';
import { CreateEvent } from '../../Api/Event/event';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';




function CreateEvents() {
  const authToken = Cookies.get("authToken");
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  // Event state
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // Dynamic Columns and Rows
  const [columns, setColumns] = useState(["Column 1", "Column 2"]); // Default columns
  const [rows, setRows] = useState([]); // Each row is a map-like object
  const [newRow, setNewRow] = useState({});


  const [submittedData, setSubmittedData] = useState([]);

  const handleColumnAdd = () => {
    const newColumn = `Col ${columns.length + 1}`;
    setColumns([...columns, newColumn]);
  
    // Update newRow with the new column key
    setNewRow((prevRow) => ({
      ...prevRow,
      [newColumn.toLowerCase().replace(/\s+/g, '')]: '',
    }));
  };
  

  const handleColInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name.toLowerCase().replace(/\s+/g, '')]: value, // Normalize keys
    }));
  };


  const handleColumnDelete = (colIndex) => {
    const updatedColumns = columns.filter((_, index) => index !== colIndex);
    const updatedRows = rows.map(row => row.filter((_, index) => index !== colIndex));
    setColumns(updatedColumns);
    setRows(updatedRows);
  };

  const handleRowAdd = () => {
    // Ensure newRow has keys for all columns
    const newRowData = columns.reduce((acc, col) => {
      const key = col.toLowerCase().replace(/\s+/g, ''); // Normalize column name
      acc[key] = newRow[key] || ''; // Default to empty string
      return acc;
    }, {});
  
    // Add newRowData to rows
    setRows((prevRows) => [...prevRows, newRowData]);
  
    // Reset newRow inputs
    const resetNewRow = columns.reduce((acc, col) => {
      acc[col.toLowerCase().replace(/\s+/g, '')] = '';
      return acc;
    }, {});
    setNewRow(resetNewRow);
  };

  
  const handleRowInputChange = (e, col) => {
    const { value } = e.target;
    const key = col.toLowerCase().replace(/\s+/g, ''); // Normalize column name
  
    setNewRow((prevRow) => ({
      ...prevRow,
      [key]: value,
    }));
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
    const newName = event.target.value.trim();
    if (!newName || columns.includes(newName)) {
      toast.error('Column name must be unique and non-empty.');
      return;
    }
    const updatedColumns = [...columns];
    updatedColumns[index] = newName;
    setColumns(updatedColumns);
  };


  const handleRowDelete = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };


  // Handle Excel Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      if (jsonData.length > 0) {
        const headers = jsonData[0].map((header) => header.trim());
        const normalizedHeaders = headers.map((header) =>
          header.toLowerCase().replace(/\s+/g, '')
        );
  
        // Map rows to key-value objects and handle undefined cells
        const dataRows = jsonData.slice(1)
          .filter((row) => row.some((cell) => cell !== undefined && cell !== ""))
          .map((row) =>
            normalizedHeaders.reduce((acc, header, index) => {
              acc[header] = row[index] !== undefined ? row[index] : "";
              return acc;
            }, {})
          );
  
        console.log("Headers:", normalizedHeaders);
        console.log("Rows:", dataRows);
  
        setColumns(headers);
        setRows(dataRows);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  

  // Submit the Form
// Instead of wrapping row data in a Map or `data` object, send it directly
const handleSubmit = async () => {
  if (!eventName || !eventDate || !startTime || !endTime) {
    toast.error("Please provide all required event details.");
    return;
  }

  const startDateTime = new Date(`${eventDate}T${startTime}`);
  const endDateTime = new Date(`${eventDate}T${endTime}`);

  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    toast.error("Invalid date or time.");
    return;
  }

  // Fix the rows structure by sending them directly as key-value pairs
  const eventData = {
    eventName,
    eventDate: new Date(eventDate),
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    description,
    columns, // dynamic columns
    rows: rows.map(row => {
      return columns.reduce((acc, col) => {
        const key = col.toLowerCase().replace(/\s+/g, ''); // Normalize column name
        acc[key] = row[key] || ''; // Ensure the key exists
        return acc;
      }, {});
    }),
    createdBy: userId,
  };

  console.log("Event Data to Submit:", eventData);

  try {
    await CreateEvent(eventData); // API call to save event
    toast.success("Event successfully created!");
    navigate("/home/myevent");
  } catch (error) {
    console.error("Error creating event: ", error);
    toast.error("Error creating event.");
  }
};



  return (
    <div className='max-w-[1320px] flex items-start'>
      <div className='w-[35%] flex-col flex h-[100vh] overflow-y-scroll'>
        <p className='text-2xl text-center font-bold text-[#313893]'>Create An Event</p>
        <Input
          name="Event Name"
          isTable={false}
          type={"text"}
          placeholder={"Event your event name"}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Input
          name="Event Date"
          isTable={false}
          type={"date"}
          placeholder={"Event your event date"}
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Input
          name="Start Time"
          isTable={false}
          type={"time"}
          placeholder={"Event your event start time"}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Input
          name="End Time"
          isTable={false}
          type={"time"}
          placeholder={"Event your event end Time"}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <Input
          name="Event Description"
          isTable={false}
          type={"text"}
          placeholder={"Event your event description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {columns.map((col, index) => (
  <div key={index} className="flex w-full justify-start items-center relative">
    <Input
      type="text"
      isTable={false}
      name={col.toLowerCase().replace(/\s+/g, '')} // Normalize key
      value={newRow[col.toLowerCase().replace(/\s+/g, '')] || ''}
      onChange={(e) => handleRowInputChange(e, col)}
      placeholder={col}
    />
    {index >= 2 && (
      <button
        onClick={() => handleColumnDelete(index)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <MdDelete className="text-red-500 hover:text-red-700 text-2xl -ml-12 mt-6" />
      </button>
    )}
  </div>
))}

        <div className='flex flex-wrap gap-4 items-center my-4 mx-auto justify-center'>
          <Button
            type="add"
            onClick={handleRowAdd}
            label={" Add Item"}
          />
          <Button
            type="add"
            onClick={handleColumnAdd}
            label={"Add More Columns"}
          />
          <label className='bg-gray-300 text-black hover:bg-gray-400 py-2 px-6 rounded-lg transition-all duration-150 cursor-pointer'>
            Upload Excel
            <input
              type='file'
              accept='.xlsx, .xls'
              onChange={handleExcelUpload}
              className='hidden'
            />
          </label>
        </div>
        <div className='p-4 mx-auto max-w-full'>
          <Button
            type="submit"
            onClick={handleSubmit}
            label={"Submit"}
          />
        </div>
      </div>
      <div className='w-[65%] h-[100vh] overflow-scroll'>
        <table className="w-full h-full border border-gray-200">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border p-2 relative text-left w-[200px]" // Ensure uniform column widths
                >
                  <Input
                    type="text"
                    value={col}
                    isTable={true}
                    onChange={(e) => handleColumnEdit(index, e)}
                    className="w-full" // Full-width input for proper alignment
                  />
                  {index >= 2 && (
                    <button
                      onClick={() => handleColumnDelete(index)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    >
                      <MdDelete className="text-red-500 hover:text-red-700 text-2xl" />
                    </button>
                  )}
                </th>
              ))}
              <th className="border p-2 w-[150px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border">
                {columns.map((col, colIndex) => {
                  const colKey = col.toLowerCase().replace(/\s+/g, ''); // Normalize column names
                  return (
                    <td key={colIndex} className="border p-2">
                      <Input
                        type="text"
                        isTable={true}
                        value={row[colKey] || ''}
                        onChange={(e) => handleCellEdit(rowIndex, colKey, e.target.value)}
                        className="w-full"
                      />
                    </td>
                  );
                })}
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleRowDelete(rowIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default CreateEvents;