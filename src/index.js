const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');



const app = express();
const PORT = process.env.PORT || 7000;
const router = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose
  .connect(process.env.DB_MONGODB)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(`Database no connected, error: ${error}`);
  });

app.get('/', (req, res) => {
  res.send('Server OK');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
