const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');


require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());


dotenv.config({path: "backend/config/config.env"})
const uri = `${process.env.ATLAS_URL}/store`;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo db connection established successfully!');


    const productRoutes = require('./routes/productRoute');
    app.use('/products', productRoutes);


    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});

module.exports = app; // Export the app for testing
