const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, NODE_ENV, DB_URL } = require('./app.constant');

if (!PORT || !NODE_ENV) {
    throw new Error('Environment values not imported properly');
}

const authRoutes = require('./routes/auth.route');

const app = express();

//connect to db
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB CONNECTION ERROR: ', err))

//middleware
app.use(morgan('dev'));
if (NODE_ENV === 'development') {
    app.use(cors({ origin: `http://localhost:3000` })); //allows 'http://localhost:3000' origin to make request
    // app.use(cors()); //allows all origin to make request
}
app.use(bodyParser.json());

app.use('/api', authRoutes);

app.get('*', (req, res) => {
    res.json({
        data: 'you hit invalid api'
    });
});

app.listen(PORT || 8000, () => {
    console.log(`Server is running on port ${PORT} - ${NODE_ENV}`);
});