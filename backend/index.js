// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const visitorRoutes = require('./routes/visitorRoutes');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

const corsOptions = {
    origin: 'https://expo-client-chi.vercel.app', // Allow only your client origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
    optionsSuccessStatus: 204
};

app.use(bodyParser.json());

// Routes
app.use('/api/visitors', visitorRoutes);


mongoose.connect("mongodb+srv://GouravChamaria:1234@cluster0.wdagdjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
