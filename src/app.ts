import express from 'express';
import { setApiRoutes } from './routes/api';
import { setWebRoutes } from './routes/web';
import { connectToDatabase } from './database/connection';
import { json, urlencoded } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

// Set up routes
setApiRoutes(app);
setWebRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});