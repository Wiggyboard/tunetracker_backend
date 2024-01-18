const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.cjs');
const mongoose = require('mongoose');
const mongodb = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
const https = require('https');
const fs = require('fs');

// SSL certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.wiggyboard.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.wiggyboard.com/fullchain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => {
  console.log(con.connection);
  console.log(`The Database connection was successful`);
});

const port = process.env.PORT || 3000;

// Creates an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`App running on port ${port} over HTTPS...`);
});