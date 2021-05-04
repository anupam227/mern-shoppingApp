const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB connects'))
.catch(err => console.log(err));

// use routes

app.use('/api/items', items)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server started'));