// src/components/VisitorItem.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const VisitorItem = ({ visitor, onDelete, onUpdate }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        axios.delete(`http://expo-server-rho.vercel.app/api/visitors/${visitor._id}`)
            .then(() => {
                onDelete(visitor._id);
            })
            .catch(err => console.error(err));
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Visitor Tag', 14, 22);
        doc.setFontSize(12);
        doc.text(`Serial Number: ${visitor.serialNumber}`, 14, 32);
        doc.text(`Name: ${visitor.name}`, 14, 40);
        doc.text(`Father/Husband Name: ${visitor.fatherOrHusbandName}`, 14, 48);
        doc.text(`House Number: ${visitor.houseNumber}`, 14, 56);
        doc.text(`City: ${visitor.city}`, 14, 64);
        doc.text(`State: ${visitor.state}`, 14, 72);
        doc.text(`Mobile: ${visitor.mobile}`, 14, 80);
        doc.text(`Age: ${visitor.age}`, 14, 88);
        doc.text(`Business: ${visitor.business}`, 14, 96);
        doc.text(`Gender: ${visitor.gender}`, 14, 104);
        doc.text(`Education: ${visitor.education}`, 14, 112);
        doc.text(`Date: ${new Date(visitor.date).toLocaleDateString()}`, 14, 120);

        doc.save(`Visitor_${visitor.serialNumber}.pdf`);
    };

    return (
        <tr>
            <td>{visitor.serialNumber}</td>
            <td>{visitor.name}</td>
            <td>{visitor.fatherOrHusbandName}</td>
            <td>{visitor.houseNumber}</td>
            <td>{visitor.city}</td>
            <td>{visitor.state}</td>
            <td>{visitor.mobile}</td>
            <td>{visitor.email}</td>
            <td>{visitor.age}</td>
            <td>{visitor.business}</td>
            <td>{visitor.gender}</td>
            <td>{visitor.education}</td>
            <td>{new Date(visitor.date).toLocaleDateString()}</td>
            <td>
                <Link to={`/edit/${visitor._id}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
                <button 
                    className="btn btn-sm btn-danger mr-2" 
                    onClick={() => setShowModal(true)}
                >
                    Delete
                </button>
                <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={generatePDF}
                >
                    Print PDF
                </button>

                {/* Confirmation Modal */}
                <ConfirmationModal 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    onConfirm={handleDelete}
                    title="Delete Confirmation"
                    body={`Are you sure you want to delete visitor "${visitor.name}"?`}
                />
            </td>
        </tr>
    );
};

export default VisitorItem;
