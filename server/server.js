const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const excelRoutes = require('./routes/excelRoute');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://123:123@cluster0.ye9gz63.mongodb.net/trial?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/excel', excelRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
