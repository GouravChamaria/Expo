// src/components/VisitorForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

const VisitorForm = () => {
  const [visitor, setVisitor] = useState({
    name: "",
    fatherOrHusbandName: "",
    houseNumber: "",
    city: "",
    state: "",
    mobile: "",
    email: "",
    age: "",
    business: "",
    gender: "",
    education: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://expo-server-rho.vercel.app/${id}`)
        .then((response) => {
          const data = response.data;
          setVisitor({
            ...data,
            date: data.date.split("T")[0], // Format date for input
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const validate = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!nameRegex.test(visitor.name)) {
      errors.name = "Name should contain only letters.";
    }

    if (!nameRegex.test(visitor.fatherOrHusbandName)) {
      errors.fatherOrHusbandName =
        "Father/Husband Name should contain only letters.";
    }

    if (!/^[A-Za-z0-9\s]+$/.test(visitor.houseNumber)) {
      errors.houseNumber = "House Number should be alphanumeric.";
    }

    if (!nameRegex.test(visitor.city)) {
      errors.city = "City should contain only letters.";
    }

    if (!/^\d+$/.test(visitor.mobile)) {
      errors.mobile = "Mobile should contain only digits.";
    } else if (!mobileRegex.test(visitor.mobile)) {
      errors.mobile = "Mobile should be 10 digits.";
    }

    if (!/^\d+$/.test(visitor.age)) {
      errors.age = "Age should be a number.";
    }

    if (!/^[A-Za-z0-9\s]+$/.test(visitor.business)) {
      errors.business = "Business should be alphanumeric.";
    }

    if (!visitor.gender) {
      errors.gender = "Please select a gender.";
    }

    if (!/^[A-Za-z0-9\s]+$/.test(visitor.education)) {
      errors.education = "Education should be alphanumeric.";
    }

    if (!visitor.state) {
      errors.state = "Please select a state.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setVisitor({ ...visitor, [e.target.name]: e.target.value });
  };

  const generatePDF = (visitor) => {
    const doc = new jsPDF();
    doc.text(`Visitor Ticket`, 10, 10);
    doc.text(`Name: ${visitor.name}`, 10, 20);
    doc.text(`Mobile: ${visitor.mobile}`, 10, 30);
    doc.text(`Event Date: ${visitor.date}`, 10, 40);
    doc.save("visitor-ticket.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post("https://expo-server-rho.vercel.app", visitor)
        .then(() => {
          generatePDF(visitor);
          setErrors({}); // Clear any existing errors
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrors({
              mobile:
                "Mobile number already exists. Please enter a different number.",
            });
          } else {
            console.error(err);
          }
        });
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
  ];

  return (
    <div className="card">
      <div className="card-header">
        {id ? "Edit Visitor" : "Add You details"}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={visitor.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Father/Husband Name */}
          <div className="form-group">
            <label>Father/Husband Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.fatherOrHusbandName ? "is-invalid" : ""
              }`}
              name="fatherOrHusbandName"
              value={visitor.fatherOrHusbandName}
              onChange={handleChange}
            />
            {errors.fatherOrHusbandName && (
              <div className="invalid-feedback">
                {errors.fatherOrHusbandName}
              </div>
            )}
          </div>

          {/* House Number */}
          <div className="form-group">
            <label>House Number</label>
            <input
              type="text"
              className={`form-control ${
                errors.houseNumber ? "is-invalid" : ""
              }`}
              name="houseNumber"
              value={visitor.houseNumber}
              onChange={handleChange}
            />
            {errors.houseNumber && (
              <div className="invalid-feedback">{errors.houseNumber}</div>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              name="city"
              value={visitor.city}
              onChange={handleChange}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <select
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              name="state"
              value={visitor.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              name="mobile"
              value={visitor.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={visitor.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              name="age"
              value={visitor.age}
              onChange={handleChange}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          {/* Business */}
          <div className="form-group">
            <label>Business</label>
            <input
              type="text"
              className={`form-control ${errors.business ? "is-invalid" : ""}`}
              name="business"
              value={visitor.business}
              onChange={handleChange}
            />
            {errors.business && (
              <div className="invalid-feedback">{errors.business}</div>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select
              className={`form-control ${errors.gender ? "is-invalid" : ""}`}
              name="gender"
              value={visitor.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>

          {/* Education */}
          <div className="form-group">
            <label>Education</label>
            <input
              type="text"
              className={`form-control ${errors.education ? "is-invalid" : ""}`}
              name="education"
              value={visitor.education}
              onChange={handleChange}
            />
            {errors.education && (
              <div className="invalid-feedback">{errors.education}</div>
            )}
          </div>

          {/* Date (readonly) */}
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={visitor.date}
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorForm;
