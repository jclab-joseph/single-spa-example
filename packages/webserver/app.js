const express = require('express');
const app = express();
const path = require('path');

const signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

const PORT = parseInt(process.env.PORT || '9000');
const MGMT_CONTEXT_PATH = process.env.MGMT_CONTEXT_PATH || '/_';

app.get(`${MGMT_CONTEXT_PATH}/health`, (req, res) => {
  res.send({health: 'OK'});
});

app.use('/', express.static(path.join(__dirname, './views')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './views', 'index.html'));
});

// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
  console.log("shutdown!");
  server.close(() => {
    console.log(`app stopped by ${signal} with value ${value}`);
    process.exit(0);
  });
};

// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`);
    shutdown(signal, signals[signal]);
  });
});

const server = app.listen(80, () => {
  console.log(`Start server: listen port=${PORT}`);
});
