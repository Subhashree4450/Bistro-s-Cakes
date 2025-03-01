
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cakeRoutes = require('./controllers/cakecontroller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = '';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.error('Database connection failed:', error));

app.use('/api', cakeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Cake Business API');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
