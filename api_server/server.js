import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

console.log('Starting Server...');
const PORT = 3000;

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/db', (req, res) =>{
    res.sendFile(`${__dirname}/secure_db.db`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const gracefulShutdown = () => {
    console.log('Shutting down server.');
    app.close();
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGBREAK', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);