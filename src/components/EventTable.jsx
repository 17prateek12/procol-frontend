import React from 'react'
import { useLocation } from 'react-router-dom';


const EventTable = () => {
    const { state } = useLocation();
    const { eventData } = state || {};

    if (!eventData) {
        return <div>Event data not found.</div>;
    }
    console.log("show event Data to me", eventData);

    const { eventName, startTime, endTime, columns, rows } = eventData;

    return (
        <div className='w-full min-h-screen flex flex-col gap-4 m-8'>
            <div className='flex flex-col p-8 border-2 rounded-[20px] bg-blue-50 w-full border-blue-800'>
                <p className='text-3xl font-bold text-blue-900'>{eventName} EVENT</p>
                <div className='mt-4 flex flex-col'>
                    <p className='text-xl font-medium'>Event Name : <span className='font-bold'>{eventName}</span></p>
                    <p className='text-xl font-medium'>Start at: <span className='font-bold'>{startTime}</span></p>
                </div>
            </div>
            <div className='min-w-[600px]'>
                <table className='border-2 border-black rounded-lg m-8'>
                    <thead className='flex items-center h-16 w-full justify-between p-8'>
                        <tr className='flex w-[600px] items-center justify-evenly'>
                            {columns.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr> 
                    </thead>
                    <tbody className='flex flex-col items-center h-16 w-full justify-between p-8'>
                        {rows.map((row, index) => (
                            <tr key={index} className='flex w-[600px] items-center justify-evenly'>
                                {row.map((cell,cellIndex)=>(
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EventTable


{/*<table.Tr className='flex items-center w-[600px] overflow-x-auto justify-between gap-4'>
                            <table.Tr className='flex flex-col items-center justify-between w-[200px]'>
                                <table.Th className='w-[200px]'>Bidder 1</table.Th>
                                <table.Th className='w-[200px] flex justify-evenly items-center'>
                                    <table.Td>Amount</table.Td>
                                    <table.Td>Rank</table.Td>
                                </table.Th>
                            </table.Tr>
                            <table.Tr className='flex flex-col items-center justify-between w-[200px]'>
                                <table.Th className='w-[200px]'>Bidder 1</table.Th>
                                <table.Th className='w-[200px] flex justify-evenly items-center'>
                                    <table.Td>Amount</table.Td>
                                    <table.Td>Rank</table.Td>
                                </table.Th>
                            </table.Tr>
                            <table.Tr className='flex flex-col items-center justify-between w-[200px]'>
                                <table.Th className='w-[200px]'>Bidder 1</table.Th>
                                <table.Th className='w-[200px] flex justify-evenly items-center'>
                                    <table.Td>Amount</table.Td>
                                    <table.Td>Rank</table.Td>
                                </table.Th>
                            </table.Tr>
                            <table.Tr className='flex flex-col items-center justify-between w-[200px]'>
                                <table.Th className='w-[200px]'>Bidder 1</table.Th>
                                <table.Th className='w-[200px] flex justify-evenly items-center'>
                                    <table.Td>Amount</table.Td>
                                    <table.Td>Rank</table.Td>
                                </table.Th>
                            </table.Tr>
                        </table.Tr>
                        <table.Tr>
                            <table.Th>Close Bid</table.Th>
                        </table.Tr>*/}