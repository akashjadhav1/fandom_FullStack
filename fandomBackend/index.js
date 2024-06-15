const express = require('express'); 
const dotenv = require('dotenv');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');

const connectToDatabase = require('./src/config/db'); 
const userRouter = require('./src/routes/user.routes'); 
const mediaRouter = require('./src/routes/media.routes');
const allDataRouter = require('./src/routes/allMedia.routes'); 
const { swaggerUi, swaggerSpec } = require('./src/swagger'); // Import Swagger configuration

dotenv.config(); 
const PORT = process.env.PORT; // Default to 5000 if PORT is not set

const app = express();

// Middlewares
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Middleware to parse cookies

// Swagger setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/user', userRouter); // Use the user routes for requests to /api/user
app.use('/api/trending', mediaRouter); // Use the media routes for requests to /api/trending
app.use('/api/all', allDataRouter); // Use the all data routes for requests to /api/all

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Fandom app'); // Send a welcome message for the root URL
});

// Start the server
app.listen(PORT, async () => { 
  try {
    await connectToDatabase(); // Connect to the database
    console.log('Server listening on port', PORT); // Log a success message
  } catch (error) {
    console.log('Error connecting to the database:', error.message); // Log an error message if there's an issue
  }
});
