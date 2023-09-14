import express from 'express';

const app = express();
const port = 8000;

app.get('', (req, res) => {
  res.send('Hello test');
});

app.get('/help', (req, res) => {
  res.send('Help page');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/weather', (req, res) => {
  res.send('Weather page');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
