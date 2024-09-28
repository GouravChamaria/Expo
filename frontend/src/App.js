// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VisitorForm from './components/VisitorForm';
import VisitorList from './components/VisitorList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <Link className="navbar-brand" to="/">SBT Property Fare</Link>
                    <div className="collapse navbar-collapse">
                        {/* <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Visitors</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Add Visitor</Link>
                            </li>
                        </ul> */}
                    </div>
                </nav>
                <Routes>
                    <Route path="/ashishchamaria" element={<VisitorList />} />
                    <Route path="/" element={<VisitorForm />} />
                    <Route path="/edit/:id" element={<VisitorForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
