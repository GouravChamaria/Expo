// src/components/VisitorList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import VisitorItem from "./VisitorItem";
import WinnerAnimation from './WinnerAnimation';

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);
  const [winner, setWinner] = useState(null);

  const selectWinner = () => {
    axios
      .get("https://expo-server-rho.vercel.app/api/visitors")
      .then((response) => {
        const visitors = response.data.filter((v) => !v.isWinner);
        const randomIndex = Math.floor(Math.random() * visitors.length);
        const selectedWinner = visitors[randomIndex];
        setWinner(selectedWinner);

        // Mark the visitor as a winner
        axios.put(`https://expo-server-rho.vercel.app/api/visitors/${selectedWinner._id}`, {
          isWinner: true,
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = () => {
    axios
      .get("https://expo-server-rho.vercel.app/api/visitors")
      .then((response) => setVisitors(response.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    setVisitors(visitors.filter((visitor) => visitor._id !== id));
  };

  const handleUpdate = (updatedVisitor) => {
    setVisitors(
      visitors.map((visitor) =>
        visitor._id === updatedVisitor._id ? updatedVisitor : visitor
      )
    );
  };

  return (
    <div>
      <h2>Visitor List</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Father/Husband Name</th>
            <th>House Number</th>
            <th>City</th>
            <th>State</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Age</th>
            <th>Business</th>
            <th>Gender</th>
            <th>Education</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <VisitorItem
              key={visitor._id}
              visitor={visitor}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={selectWinner}>Select Winner</button>
        {winner && <WinnerAnimation winner={winner} />}
      </div>
    </div>
  );
};

export default VisitorList;
