import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();
const PORT: number|string = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/', (req: Request, res: Response) => {
    res.render(path.join(__dirname, "../" ,'public', 'index.html'));
});

app.get('/dist/frontend.js', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'frontend.js'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});