const express = require('express');
const connectDB = require('./config/db');

const app = express();

const users = require('./routes/api/users');
// connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //body parsor

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', users);
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runing on  http://localhost:${PORT}`));