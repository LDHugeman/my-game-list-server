const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const api = require('./routes/api');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.json({ extended: false }));
app.listen(PORT, () => {
  console.log('Server runnig on port:' + PORT);
});

app.get('/', (req, res) => {
  res.send('Hola desde server');
});

app.get('/status', (request, response) => {
  response.send({ message: 'Servidor OK' });
});

app.get('/login', (request, response) => {
  console.log(request.query);
  response.send({ message: 'ok' });
});
