// app.ts
import express from 'express';
import path from 'path';
import { handleHome, handleAbout } from './routes/routes';

const app = express();

// Configures the views folder and the template engine
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Set the route for the home page
app.get('/', handleHome);

// Set the route for the About page
app.get('/about', handleAbout);

export default app;
