// DataTable.js
import React, { useEffect, useRef } from 'react';
import "./Data.css"
const PersonalDetailsDataTable = ({ data }) => {

  return (
    <table className="display custom-table">
      <thead>
        <tr>
          <th className="header-cell">Name</th>
          <th className="header-cell">Age</th>
          <th className="header-cell">Sex</th>
          <th className="header-cell">Mobile</th>
          <th className="header-cell">Govt ID Type</th>
          <th className="header-cell">Govt ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="data-cell">{item.name}</td>
            <td className="data-cell">{item.age}</td>
            <td className="data-cell">{item.sex}</td>
            <td className="data-cell">{item.mobile}</td>
            <td className="data-cell">{item.govtIdType}</td>
            <td className="data-cell">{item.govtId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonalDetailsDataTable;
