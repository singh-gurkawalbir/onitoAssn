// DataTable.js
import React, { useEffect, useRef } from 'react';
import "./Data.css"
const AddressDetailsDataTable = ({ data }) => {

  return (
    <table className="display custom-table">
      <thead>
        <tr>
          <th className="header-cell">Address</th>
          <th className="header-cell">State</th>
          <th className="header-cell">City</th>
          <th className="header-cell">Country</th>
          <th className="header-cell">Pincode</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="data-cell">{item.address}</td>
            <td className="data-cell">{item.state}</td>
            <td className="data-cell">{item.city}</td>
            <td className="data-cell">{item.country}</td>
            <td className="data-cell">{item.pincode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddressDetailsDataTable;
