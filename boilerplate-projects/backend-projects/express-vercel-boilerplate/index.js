const express = require('express');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.get('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
