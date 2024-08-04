const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const collegeRouter = require('./routes/college');
const logsRouter =  require('./routes/logs')

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = 'mongodb://localhost:27017/rcss';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});


app.use('/college', collegeRouter);
app.use('/logs',logsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
