const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

// Info level logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const timestamp = new Date().toISOString();

    console.log(`[INFO] [${timestamp}] ${method} ${url} - IP: ${ip}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[INFO] [${timestamp}] ${method} ${url} - IP: ${ip} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
});

// Debug level logging middleware
app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(`[DEBUG] Request made to ${url} with method ${method}`);
    next();
});

// Use Morgan for combined logging
app.use(morgan('combined'));

// Define some routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
