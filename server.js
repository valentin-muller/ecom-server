const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
require('dotenv').config({
    path: './config/index.env'
});

//MongoDB
const connectDB = require('./config/db');
connectDB();

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/user', require('./routes/authRoute'))

app.get('/', (req, res) => {
    res.send('text route => home page');
});

// Page Not Found
app.use((req, res) => {
    res.status(404).json({
        msg: "Page not found"
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

