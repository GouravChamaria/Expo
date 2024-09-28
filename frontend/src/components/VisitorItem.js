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
        axios.delete(`https://expo-server-rho.vercel.app/api/visitors/${visitor._id}`)
            .then(() => {
                onDelete(visitor._id);
            })
            .catch(err => console.error(err));
    };

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
        });
    
        // Add the PDF template as an image (e.g., a background)
        const imgData = '/Users/gouravchamaria/Downloads/template.jpg'; // Replace with the path to your template image
        
        doc.addImage(imgData, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight()); // Adjust the dimensions as needed
    
        // Now overlay text on top of the template
        doc.setFontSize(18);
        doc.text('Visitor Tag', 40, 60); // Adjust the positions based on your template
        doc.setFontSize(12);
        doc.text(`Serial Number: ${visitor.serialNumber}`, 40, 80);
        doc.text(`Name: ${visitor.name}`, 40, 100);
        doc.text(`Father/Husband Name: ${visitor.fatherOrHusbandName}`, 40, 120);
        doc.text(`House Number: ${visitor.houseNumber}`, 40, 140);
        doc.text(`City: ${visitor.city}`, 40, 160);
        doc.text(`State: ${visitor.state}`, 40, 180);
        doc.text(`Mobile: ${visitor.mobile}`, 40, 200);
        doc.text(`Age: ${visitor.age}`, 40, 220);
        doc.text(`Business: ${visitor.business}`, 40, 240);
        doc.text(`Gender: ${visitor.gender}`, 40, 260);
        doc.text(`Education: ${visitor.education}`, 40, 280);
        doc.text(`Date: ${new Date(visitor.date).toLocaleDateString()}`, 40, 300);
    
        // Save the PDF
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
